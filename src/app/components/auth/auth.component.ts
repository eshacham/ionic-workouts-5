import { Component, OnInit, Input } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Logger, LoggingService } from 'ionic-logging-service';
import { Store } from '@ngrx/store';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IAppState } from 'src/app/store/state/app.state';
import { SetSignedInUser } from 'src/app/store/actions/data.actions';
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
    verificationCode: '',
    custom_clubs_gyms: '',
    custom_pt_cert: '',
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

  // get IsWebApp() { return this.dataService.isWebApp; }

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
      await Auth.resendSignUp(this.formInputState.username);
      this.confirmSignUpState = true;
      this.resetPasswordState = false;
      this.forgotPasswordState = false;
    } catch (err) {
      this.logger.error('resendCode', err);
      this.toastService.presentToast(`Failed to resend verification code! ${err.message}`, true);
    }
  }

  async changePassword() {
    try {
      await Auth.changePassword(this.user, this.formInputState.oldPassword, this.formInputState.password);
      this.signInState = false;
      this.changePasswordState = false;
    } catch (err) {
      this.logger.error('changePassword', err);
      this.toastService.presentToast(`Failed to change password! ${err.message}`, true);
    }
  }

  async signUp() {
    try {
      if (!this.formInputState.email) {
        throw Error('Email cannot be empty as it is used to send the verification code');      }
      await Auth.signUp({
        username: this.formInputState.username,
        password: this.formInputState.password,
        attributes: {
          email: this.formInputState.email,
          'custom:clubs': this.formInputState.custom_clubs_gyms,
          'custom:certs': this.formInputState.custom_pt_cert,
        }});
      this.confirmSignUpState = true;
      this.signUpState = true;
    } catch (err) {
      this.logger.error('signUp', err);
      this.toastService.presentToast(`Failed to sign up! ${err.message}`, true);
    }
  }

  async updateAccount() {
    try {
      await Auth.updateUserAttributes(
        this.user,
        {
          'custom:clubs': this.formInputState.custom_clubs_gyms,
          'custom:certs': this.formInputState.custom_pt_cert,
        });
      this.signedInState = true;
      this.updateAccountState = false;
    } catch (err) {
      this.logger.error('updateAccount', err);
      this.toastService.presentToast(`Failed to update account! ${err.message}`, true);
    }
  }

  async confirmSignUp() {
    try {
      await Auth.confirmSignUp(this.formInputState.username, this.formInputState.verificationCode);
      this.signInState = true;
      this.confirmSignUpState = false;
      this.signUpState = false;
    } catch (err) {
      this.logger.error('confirmSignUp', err);
      this.toastService.presentToast(`Failed to confirm verification code! ${err.message}`, true);
    }
  }

  async forgotPassword() {
    try {
      await Auth.forgotPassword(this.formInputState.username);
      this.resetPasswordState = true;
      this.forgotPasswordState = false;
    } catch (err) {
      this.logger.error('forgotPassword', err);
      this.toastService.presentToast(`Failed to reset Password! ${err.message}`, true);
    }
  }

  async resetPassword() {
    try {
      await Auth.forgotPasswordSubmit(this.formInputState.username, this.formInputState.verificationCode, this.formInputState.password);
      this.signInState = true;
      this.resetPasswordState = false;
      this.forgotPasswordState = false;
    } catch (err) {
      this.logger.error('resetPassword', err);
      this.toastService.presentToast(`Failed to submit new Password! ${err.message}`, true);
    }
  }

  async signIn() {
    try {
      if (!this.formInputState.password || !this.formInputState.username) {
        throw Error('Username or Passowrd cannot be empty');
      }
      await Auth.signIn(this.formInputState.username, this.formInputState.password);
      this.signedInState = true;
      this.signInState = false;
      this.forgotPasswordState = false;
    } catch (err) {
      this.logger.error('signIn', err);
      this.toastService.presentToast(`Failed to sign in! ${err.message}`, true);
    }
  }

  async signOut() {
    try {
      await Auth.signOut();
      this.signInState = true;
      this.signedInState = false;
    } catch (err) {
      this.logger.error('signOut', err);
      this.toastService.presentToast(`Failed to sign out! ${err}`, true);
    }
  }

  getUserAttributes(attr: string) {
    return this.user?.attributes[attr];
  }

  get IsWebApp() { return this.dataService.isWebApp; }


}
