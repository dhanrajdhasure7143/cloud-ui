/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OpenIDAuthService } from './openIdauth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenIDAuthService,
        {
          provide: Router, useValue: { navigate: () => {} }
        }]
    });
  });

  it('should ...', inject([OpenIDAuthService], (service: OpenIDAuthService) => {
    expect(service).toBeTruthy();
  }));
});
