import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowcreateComponent } from './workflowcreate.component';

describe('WorkflowcreateComponent', () => {
  let component: WorkflowcreateComponent;
  let fixture: ComponentFixture<WorkflowcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
