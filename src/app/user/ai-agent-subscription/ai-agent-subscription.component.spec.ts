import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentSubscriptionComponent } from './ai-agent-subscription.component';

describe('AiAgentSubscriptionComponent', () => {
  let component: AiAgentSubscriptionComponent;
  let fixture: ComponentFixture<AiAgentSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
