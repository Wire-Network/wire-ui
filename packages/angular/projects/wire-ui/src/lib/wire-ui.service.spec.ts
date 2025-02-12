import { TestBed } from '@angular/core/testing';

import { WireUiService } from './wire-ui.service';

describe('WireUiService', () => {
  let service: WireUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WireUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
