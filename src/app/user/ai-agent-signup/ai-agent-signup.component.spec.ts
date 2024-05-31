import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentSignupComponent } from './ai-agent-signup.component';

describe('AiAgentSignupComponent', () => {
  let component: AiAgentSignupComponent;
  let fixture: ComponentFixture<AiAgentSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
