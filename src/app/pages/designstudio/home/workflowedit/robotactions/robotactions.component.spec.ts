import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotactionsComponent } from './robotactions.component';

describe('RobotactionsComponent', () => {
  let component: RobotactionsComponent;
  let fixture: ComponentFixture<RobotactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
