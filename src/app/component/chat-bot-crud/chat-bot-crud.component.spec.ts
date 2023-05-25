import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotCrudComponent } from './chat-bot-crud.component';

describe('ChatBotCrudComponent', () => {
  let component: ChatBotCrudComponent;
  let fixture: ComponentFixture<ChatBotCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
