import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepselectionComponent } from './stepselection.component';

describe('StepselectionComponent', () => {
  let component: StepselectionComponent;
  let fixture: ComponentFixture<StepselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
