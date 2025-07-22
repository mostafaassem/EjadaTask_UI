import { TestBed } from '@angular/core/testing';

import { ChatToggle } from './chat-toggle';




describe('ChatToggle', () => {
  let service: ChatToggle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatToggle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
