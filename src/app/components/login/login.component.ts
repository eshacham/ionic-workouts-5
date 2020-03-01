import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Logger, LoggingService } from 'ionic-logging-service';
import { ModalController } from '@ionic/angular';
import { IAppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import { SetSignedInUser } from 'src/app/store/actions/data.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private logger: Logger;
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

  constructor(
    private amplifyService: AmplifyService,
    private modalCtrl: ModalController,
    loggingService: LoggingService,
    private store: Store<IAppState>,

  ) {
    this.logger = loggingService.getLogger('App.ExerciseThumbnailComponent');
  }

  ngOnInit() {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.logger.info('ngOnInit', 'authStateChange', authState);
        if (authState.state === 'signedIn'){
          this.store.dispatch(new SetSignedInUser(authState.user.username));
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
}
