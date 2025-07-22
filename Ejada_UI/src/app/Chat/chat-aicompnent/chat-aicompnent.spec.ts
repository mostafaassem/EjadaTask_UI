import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAICompnent } from './chat-aicompnent';

describe('ChatAICompnent', () => {
  let component: ChatAICompnent;
  let fixture: ComponentFixture<ChatAICompnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAICompnent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAICompnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
