import { TestBed } from '@angular/core/testing';

import { BotGridService } from './bot-grid.service';

describe('BotGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotGridService = TestBed.get(BotGridService);
    expect(service).toBeTruthy();
  });
});
