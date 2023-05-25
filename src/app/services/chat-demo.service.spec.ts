import { TestBed } from '@angular/core/testing';

import { ChatDemoService } from './chat-demo.service';

describe('ChatDemoService', () => {
  let service: ChatDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
