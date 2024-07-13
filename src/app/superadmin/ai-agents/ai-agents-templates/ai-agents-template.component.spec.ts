import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentsTemplateComponent } from './ai-agents-template.component';

describe('AiAgentsTemplateComponent', () => {
  let component: AiAgentsTemplateComponent;
  let fixture: ComponentFixture<AiAgentsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentsTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
