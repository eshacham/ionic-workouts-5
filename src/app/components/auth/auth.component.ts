import { Component, OnInit, Input } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Logger, LoggingService } from 'ionic-logging-service';
import { Store } from '@ngrx/store';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IAppState } from 'src/app/store/state/app.state';
import { SetSignedInUser, AuthAction, AuthActionSuccess } from 'src/app/store/actions/data.actions';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { ISignedInUser } from 'src/app/store/state/data.state';
import { ToastService } from 'src/app/providers/toast-service/toast-service';

export enum FormState {
  SignUp,
  ConfirmSignUp,
  SignIn,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  UpdateAttributes,
  SignedIn,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent implements OnInit {
  signUpState = false;
  confirmSignUpState = false;
  signInState = true;
  changePasswordState = false;
  forgotPasswordState = false;
  resetPasswordState = false;
  updateAccountState = false;
  signedInState = false;
  private logger: Logger;
  @Input() signedInUser: ISignedInUser;
  private user: any;
  formInputState = {
    username: '',
    password: '',
    oldPassword: '',
    email: '',
    confirmEmail: '',
    verificationCode: '',
    custom_clubs: '',
    custom_certs: '',
  };

  get identityIdText(): string {
    if (!this.signedInUser || !this.signedInUser.identityId) {
      return '(Not Signed In)';
    } else {
      return `${this.signedInUser.identityId.split(':')[1]}`;
    }
  }
  constructor(
    loggingService: LoggingService,
    private store: Store<IAppState>,
    private clipboard: Clipboard,
    private dataService: DataServiceProvider,
    private toastService: ToastService,

  ) {
    this.logger = loggingService.getLogger('App.LoginComponent');
  }

  async ngOnInit() {
    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          await this.setSignedInUser(data.payload.data);
          this.logger.info('auth', `${this.signedInUser?.username} signed in!`);
          break;
        case 'signUp':
          this.logger.info('auth', 'user signed up');
          break;
        case 'signOut':
          this.logger.info('auth', `${this.signedInUser?.username} signed out!`);
          await this.setSignedInUser(null);
          break;
        case 'signIn_failure':
          this.logger.info('auth', 'user sign in failed');
          break;
        case 'configured':
          this.logger.info('auth', 'the Auth module is configured');
      }
    });
    try {
      const user = await Auth.currentAuthenticatedUser();
      await this.setSignedInUser(user);
      console.log('user is signed in:', this.signedInUser);
      if (this.signedInUser) {
        this.signedInState = true;
        this.signInState = false;
      } else {
        await this.setSignedInUser(null);
        this.signInState = true;
        this.signedInState = false;
      }
    } catch (err) {
      await this.setSignedInUser(null);
      this.signInState = true;
      this.signedInState = false;
    }
  }
  private async setSignedInUser(data: any) {
    if (data) {
      this.user = data;
      const creds = await this.getAuthCreds();
      this.signedInUser = {
        username: data.username,
        identityId: creds.identityId
      };
    } else {
      this.signedInUser = null;
      this.user = null;
    }

    this.store.dispatch(new SetSignedInUser(this.signedInUser));
  }

  onChange(event: any) {
    this.formInputState = { ...this.formInputState, [event.target.name]: event.target.value };
  }

  async getAuthCreds() {
    const credentials = await Auth.currentCredentials();
    this.logger.info('getAuthCreds', 'currentCredentials', credentials);
    return credentials;
  }

  copyUserId() {
    if (this.dataService.isMobile) {
      this.clipboard.copy(this.signedInUser.identityId);
    }
  }

  async resendCode() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.resendSignUp(this.formInputState.username);
      this.confirmSignUpState = true;
      this.resetPasswordState = false;
      this.forgotPasswordState = false;
      this.toastService.presentToast(`Verification code for ${this.formInputState.username} has been requested`);
    } catch (err) {
      this.logger.error('resendCode', err);
      this.toastService.presentToast(`Failed to resend verification code! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async changePassword() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.changePassword(this.user, this.formInputState.oldPassword, this.formInputState.password);
      this.signInState = false;
      this.changePasswordState = false;
      this.toastService.presentToast(`New password for ${this.user.username} has been set`);
    } catch (err) {
      this.logger.error('changePassword', err);
      this.toastService.presentToast(`Failed to change password! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async signUp() {
    try {
      if (!this.formInputState.email || !this.formInputState.confirmEmail) {
        throw Error('Email cannot be empty');
      }
      if (this.formInputState.email !== this.formInputState.confirmEmail) {
        throw Error('Email and Confirm Email are not the same');
      }
      this.store.dispatch(new AuthAction());
      await Auth.signUp({
        username: this.formInputState.username,
        password: this.formInputState.password,
        attributes: {
          email: this.formInputState.email,
          'custom:clubs': this.formInputState.custom_clubs || '',
          'custom:certs': this.formInputState.custom_certs || '',
        }});
      this.confirmSignUpState = true;
      this.signUpState = true;
      this.toastService.presentToast(`New account for ${this.formInputState.username} has been created. A verification code has been sent to ${this.formInputState.email}`, true);
    } catch (err) {
      this.logger.error('signUp', err);
      this.toastService.presentToast(`Failed to sign up! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async updateAccount() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.updateUserAttributes(
        this.user,
        {
          'custom:clubs': this.formInputState.custom_clubs || '',
          'custom:certs': this.formInputState.custom_certs || '',
        });
      this.signedInState = true;
      this.updateAccountState = false;
      this.toastService.presentToast(`The account for ${this.formInputState.username} has been updated`);
    } catch (err) {
      this.logger.error('updateAccount', err);
      this.toastService.presentToast(`Failed to update account! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async confirmSignUp() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.confirmSignUp(this.formInputState.username, this.formInputState.verificationCode);
      this.signInState = true;
      this.confirmSignUpState = false;
      this.signUpState = false;
      this.toastService.presentToast(`User ${this.formInputState.username} is confirmed. You can sign in to your account now`, true);
    } catch (err) {
      this.logger.error('confirmSignUp', err);
      this.toastService.presentToast(`Failed to confirm verification code! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async forgotPassword() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.forgotPassword(this.formInputState.username);
      this.resetPasswordState = true;
      this.forgotPasswordState = false;
      this.toastService.presentToast(`New verfication code for ${this.formInputState.username} has been sent. You can change your passowrd once you recieve the code`, true);
    } catch (err) {
      this.logger.error('forgotPassword', err);
      this.toastService.presentToast(`Failed to reset Password! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async resetPassword() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.forgotPasswordSubmit(this.formInputState.username, this.formInputState.verificationCode, this.formInputState.password);
      this.signInState = true;
      this.resetPasswordState = false;
      this.forgotPasswordState = false;
      this.toastService.presentToast(`New password for ${this.user.username} has been set`);
    } catch (err) {
      this.logger.error('resetPassword', err);
      this.toastService.presentToast(`Failed to submit new Password! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async signIn() {
    try {
      if (!this.formInputState.password || !this.formInputState.username) {
        throw Error('Username or Passowrd cannot be empty');
      }
      this.store.dispatch(new AuthAction());
      await Auth.signIn(this.formInputState.username, this.formInputState.password);
      this.signedInState = true;
      this.signInState = false;
      this.forgotPasswordState = false;
    } catch (err) {
      this.logger.error('signIn', err);
      this.toastService.presentToast(`Failed to sign in! ${err.message}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  async signOut() {
    try {
      this.store.dispatch(new AuthAction());
      await Auth.signOut();
      this.signInState = true;
      this.signedInState = false;
      Object.keys(this.formInputState).forEach(key => this.formInputState[key] = null);
    } catch (err) {
      this.logger.error('signOut', err);
      this.toastService.presentToast(`Failed to sign out! ${err}`, true);
    }
    finally {
      this.store.dispatch(new AuthActionSuccess());
    }
  }

  getUserAttributes(attr: string) {
    return this.user?.attributes[attr];
  }

  get IsWebApp() { return this.dataService.isWebApp; }


}
