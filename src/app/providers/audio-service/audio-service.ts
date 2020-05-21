import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioServiceProvider {
  private startWorkoutPlayer: Howl;
  constructor() {
      this.startWorkoutPlayer = new Howl({
        src: ['assets/sounds/startWorkout.gong1.wav']
      });
  }

  public playStartWorkout() {
    this.startWorkoutPlayer.stop();
    this.startWorkoutPlayer.play();
  }

}
