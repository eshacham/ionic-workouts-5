import { Logger, LoggingService } from 'ionic-logging-service';
import { AmplifyService } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IAppState } from 'src/app/store/state/app.state';
import { SetSignedInUser } from 'src/app/store/actions/data.actions';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { ISignedInUser } from 'src/app/store/state/data.state';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private logger: Logger;
  @Input() signedInUser: ISignedInUser;
  authState: AuthState;
  signUpConfig = {
    header: 'Create a new TrainMe account',
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Username',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string',
      }, {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 2,
        type: 'email'
      },{
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 3,
        type: 'password'
      },{
        label: 'Phone Number',
        key: 'phone_number',
        required: false,
        displayOrder: 4,
        type: 'string'
      },{
        label: 'PT Certifications',
        key: 'custom:certs',
        required: false,
        displayOrder: 5,
        type: 'string'
      },{
        label: 'Clubs/Gyms',
        key: 'custom:clubs',
        required: false,
        displayOrder: 6,
        type: 'string'
      },
    ]
  }

get identityIdText(): string {
  if (!this.signedInUser || !this.signedInUser.identityId) {
    return '(Not Signed In)';
  } else {
    return `${this.signedInUser.identityId.split(':')[1]}`;
  }
}
  constructor(
    private amplifyService: AmplifyService,
    loggingService: LoggingService,
    private store: Store<IAppState>,
    private clipboard: Clipboard,
    private dataService: DataServiceProvider,
  ) {
    this.logger = loggingService.getLogger('App.LoginComponent');
  }

  ngOnInit() {
    this.amplifyService.authStateChange$
      .subscribe(async authState => {
        this.logger.info('ngOnInit', 'authStateChange', authState);
        this.authState = authState;
        if (authState.state === 'signedIn'){
          const creds = await this.displayAuthCreds();
          this.store.dispatch(new SetSignedInUser({
            username: authState.user.username,
            identityId: creds.identityId
          }));
        } else if (authState.state === 'signedOut'){
          this.store.dispatch(new SetSignedInUser(null));
        }
      });
  }

  get IsWebApp() { return this.dataService.isWebApp; }

  async displayAuthCreds() {
    const credentials = await Auth.currentCredentials();
    this.logger.info('displayAuthCreds', 'currentCredentials', credentials);
    return credentials;
  }

  copyUserId() {
    if (this.dataService.isMobile) {
      this.clipboard.copy(this.signedInUser.identityId);
    }
  }
}
