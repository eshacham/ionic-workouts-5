import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioServiceProvider {
  private audio: Howl;
  constructor() {
      this.audio = createAudio();
  }

  get Audio(): Howl {
    if (!this.audio) {
      this.audio = createAudio();
    }
    return this.audio
  }

  public playStartWorkout() {
    this.Audio.stop();
    this.Audio.play();
  }

}
function createAudio(): Howl {
  return new Howl({
    src: ['assets/sounds/startWorkout.gong1.wav']
  });
}
