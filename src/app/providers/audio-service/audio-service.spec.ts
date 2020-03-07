import { TestBed } from '@angular/core/testing';

import { AudioServiceProvider } from './audio-service';

describe('AudioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioServiceProvider = TestBed.get(AudioServiceProvider);
    expect(service).toBeTruthy();
  });
});
