import { TestBed } from '@angular/core/testing';
import { DataServiceProvider } from './data-service.service';

describe('DataServiceProvider', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataServiceProvider = TestBed.get(DataServiceProvider);
    expect(service).toBeTruthy();
  });
});
