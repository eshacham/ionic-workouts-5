import { Logger, LoggingService } from 'ionic-logging-service';
// import { AmplifyService } from 'aws-amplify-angular';
// import Auth from '@aws-amplify/auth';
// import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Auth, Hub } from 'aws-amplify';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components'
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IAppState } from 'src/app/store/state/app.state';
import { SetSignedInUser } from 'src/app/store/actions/data.actions';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { ISignedInUser } from 'src/app/store/state/data.state';
import { getSignedInUser } from 'src/app/store/selectors/data.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private logger: Logger;
  signedInUser: ISignedInUser;
  authState: AuthState;
  formFields: FormFieldTypes = [
    {
      type: 'string',
      label: 'Username',
      required: true,
      placeholder: 'Enter your username',
    }, {
      type: 'email',
      label: 'Email',
      required: true,
    },{
      type: 'password',
      label: 'Password',
      required: true,
    },{
      type: 'phone_number',
      label: 'Phone Number',
      required: false,
      placeholder: 'Enter your phone number'
    },{
      type: 'string',
      label: 'PT Certifications',
      required: false,
      placeholder: 'Enter your PT Certifications'
    },{
      type: 'string',
      label: 'Clubs/Gyms',
      required: false,
      placeholder: 'Enter your Clubs/Gyms'
    },
  ]

get identityIdText(): string {
  if (!this.signedInUser || !this.signedInUser.identityId) {
    return '(Not Signed In)';
  } else {
    return `${this.signedInUser.identityId.split(':')[1]}`;
  }
}
get IsSignUp(): boolean {
    return this.authState === AuthState.SignUp
}
  constructor(
    // private amplifyService: AmplifyService,
    loggingService: LoggingService,
    private store: Store<IAppState>,
    private clipboard: Clipboard,
    private dataService: DataServiceProvider,
  ) {
    this.logger = loggingService.getLogger('App.LoginComponent');
    onAuthUIStateChange((nextAuthState) => {
      this.authState = nextAuthState;
      this.logger.info('onAuthUIStateChange', nextAuthState);
    })
  }
  authListener = async (data: { payload: { event: any; }; }) => {
    this.logger.info('ngOnInit', 'authStateChange', this.authState);
    const authState = data.payload.event;
    switch (authState) {
      case 'signIn':
        await this.setSignedInUser(true);
            break;
        // case 'signUp':
          // this.logger.info('user signed up');
            // break;
        case 'signOut':
          await this.setSignedInUser(false);
            break;
        // case 'signIn_failure':
        //   this.logger.error('user sign in failed');
        //     break;
      default:
    }
  }
  private dispatchUserSignedInOrOut() {
    this.store.dispatch(new SetSignedInUser(this.signedInUser));
  }

  ngOnInit() {
    // this.amplifyService.authStateChange$
    //   .subscribe(async authState => {
    //     this.logger.info('ngOnInit', 'authStateChange', authState);
    //     this.authState = authState;
    //     if (authState.state === 'signedIn'){
    //       const creds = await this.displayAuthCreds();
    //       this.store.dispatch(new SetSignedInUser({
    //         username: authState.user.username,
    //         identityId: creds.identityId
    //       }));
    //     } else if (authState.state === 'signedOut'){
    //       this.store.dispatch(new SetSignedInUser(null));
    //     }
    //   });
    Hub.listen('auth', this.authListener);
    this.store.select(getSignedInUser)
      .pipe(take(1))
      .subscribe(signedInUser => {
        if (!signedInUser) {
          Auth.signOut();
        }
        this.signedInUser = signedInUser;
      });
  }

  get IsWebApp() { return this.dataService.isWebApp; }

  // async displayAuthCreds() {
  //   const credentials = await Auth.currentCredentials();
  //   this.logger.info('displayAuthCreds', 'currentCredentials', credentials);
  //   return credentials;
  // }
  async setSignedInUser(signedIn: boolean) {
    if (!signedIn) {
      this.signedInUser = null;
    } else {
      const { identityId } = await Auth.currentUserCredentials();
      const { username } = await Auth.currentAuthenticatedUser({bypassCache: false });
      this.signedInUser = { identityId, username };
    }
    this.dispatchUserSignedInOrOut();
    this.logger.info('getSignedInUser', this.signedInUser);
  }

  copyUserId() {
    if (this.dataService.isMobile) {
      this.clipboard.copy(this.signedInUser.identityId);
    }
  }
  // submitSignUp = async (event: Event) => {
  //   this.logger.debug('submitSignUp', event);
  //   try {
  //       await Auth.signUp({
  //         username: 'eyal3',
  //         password: 'Whitekay1!',
  //         attributes: {
  //             email: 'shacham@swbell.net',
  //         },
  //       })
  //   } catch(err) {
  //     this.logger.error('submitSignUp', err);
  //   };
  // }
}
