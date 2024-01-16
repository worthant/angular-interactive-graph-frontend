import { TestBed } from '@angular/core/testing';

import { CanvasSetupService } from './canvas-setup.service';

describe('CanvasSetupService', () => {
  let service: CanvasSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
