import { TestBed } from '@angular/core/testing';

import { NewpasswordService } from './newpassword.service';

describe('NewpasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewpasswordService = TestBed.get(NewpasswordService);
    expect(service).toBeTruthy();
  });
});
