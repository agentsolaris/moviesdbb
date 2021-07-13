import { TestBed } from '@angular/core/testing';

import { SoundtrackService } from './soundtrack.service';

describe('SoundtrackService', () => {
  let service: SoundtrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundtrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
