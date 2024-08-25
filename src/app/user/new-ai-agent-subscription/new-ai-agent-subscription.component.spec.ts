import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAiAgentSubscriptionComponent } from './new-ai-agent-subscription.component';

describe('NewAiAgentSubscriptionComponent', () => {
  let component: NewAiAgentSubscriptionComponent;
  let fixture: ComponentFixture<NewAiAgentSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAiAgentSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAiAgentSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
