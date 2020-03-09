import { Component, OnInit, Input } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Logger, LoggingService } from 'ionic-logging-service';
import { ModalController } from '@ionic/angular';
import { IAppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { SetSignedInUser } from 'src/app/store/actions/data.actions';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import Auth from '@aws-amplify/auth';
import { ISignedInUser } from 'src/app/store/state/data.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private logger: Logger;
  @Input() signedInUser: ISignedInUser;
  usernameAttributes = 'email';
  signUpConfig = {
    // header: 'My Customized Sign Up',
    hideAllDefaults: true,
    signUpFields: [
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password'
      }, {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 2,
        type: 'string',
      },
    ]
  }

get identityIdText(): string {
  return `Copy User IdentityId: ${this.signedInUser ? this.signedInUser.identityId : '(Not Signed In)'}`;
}
  constructor(
    private amplifyService: AmplifyService,
    private modalCtrl: ModalController,
    loggingService: LoggingService,
    private store: Store<IAppState>,
    private clipboard: Clipboard,

    private dataService: DataServiceProvider,
  ) {
    this.logger = loggingService.getLogger('App.ExerciseThumbnailComponent');
  }

  ngOnInit() {
    this.amplifyService.authStateChange$
      .subscribe(async authState => {
        this.logger.info('ngOnInit', 'authStateChange', authState);
        if (authState.state === 'signedIn'){
          const creds = await this.displayAuthCreds();
          this.store.dispatch(new SetSignedInUser({
            username: authState.user.username,
            identityId: creds.identityId
          }));
        } else {
          this.store.dispatch(new SetSignedInUser(null));
        }
      });
  }
  dismiss(loggedIn: boolean) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      loggedIn
    });
  }

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
