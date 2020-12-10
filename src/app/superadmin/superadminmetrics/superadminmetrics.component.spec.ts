import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminmetricsComponent } from './superadminmetrics.component';

describe('SuperadminmetricsComponent', () => {
  let component: SuperadminmetricsComponent;
  let fixture: ComponentFixture<SuperadminmetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminmetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminmetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
