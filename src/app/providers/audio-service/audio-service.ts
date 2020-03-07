import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioServiceProvider {
  private startWorkoutPlayer: Howl;
  constructor() {
  }

  public playStartWorkout() {
    if (!this.startWorkoutPlayer) {
      this.startWorkoutPlayer = new Howl({
        src: ['assets/sounds/startWorkout.wav']
      });
    } else {
      this.startWorkoutPlayer.stop();
    }
    this.startWorkoutPlayer.play();
  }

}
