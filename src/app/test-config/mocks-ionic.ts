import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Workout } from '../models/Workout';
import { getDefaultWorkoutsMaps } from '../constants/defaultWorkouts';

export const defaultFirstWorkout = getDefaultWorkoutsMaps().workouts[0];

export class PlatformMock {
  public ready(): Promise<any> {
    return Promise.resolve();
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: () => void, priority?: number): () => true {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): () => true {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    // tslint:disable-next-line: no-string-literal
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class MockNavParams {
  data = {
     workout: defaultFirstWorkout,
     set: defaultFirstWorkout.days[0].exerciseSets[0].exercises[0].sets[0],
     exerciseSet: defaultFirstWorkout.days[0].exerciseSets[0].exercises[0],
  };

  get(param: string) {
    return this.data[param];
  }
}

export class NavMock {

  public pop(): any {
    return new Promise((resolve: () => void) => {
      resolve();
    });
  }

  public push(): any {
    return new Promise((resolve: () => void) => {
      resolve();
    });
  }

  public getActive(): any {
    return {
      instance: {
        model: 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return ;
  }
}

export class StorageMock {
  async ready() {}
  async get(key: string) {}
  async set(key: string, workouts: Workout[]) {}
}

export class MockDataServiceProvider {
  getLastSelectedWorkoutDay(workoutName: string): number { return 1; }
  setLastSelectedWorkoutDay(workoutName: string, workout: Workout) {}
}

export class PopoverControllerMock {
  create() {
    return { present() {} };
  }
}

export class MockRouter {
  navigate(url: string) {}
}
