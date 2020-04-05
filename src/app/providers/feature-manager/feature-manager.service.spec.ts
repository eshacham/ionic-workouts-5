import { TestBed } from '@angular/core/testing';

import { FeatureManagerService } from './feature-manager.service';

describe('FeatureManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureManagerService = TestBed.get(FeatureManagerService);
    expect(service).toBeTruthy();
  });
});
