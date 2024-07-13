import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentsAttributesComponent } from './ai-agents-attributes.component';

describe('AiAgentsAttributesComponent', () => {
  let component: AiAgentsAttributesComponent;
  let fixture: ComponentFixture<AiAgentsAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentsAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentsAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
