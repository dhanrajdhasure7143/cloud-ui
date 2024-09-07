import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentsListComponent } from './ai-agents-list.component';

describe('AiAgentsListComponent', () => {
  let component: AiAgentsListComponent;
  let fixture: ComponentFixture<AiAgentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
