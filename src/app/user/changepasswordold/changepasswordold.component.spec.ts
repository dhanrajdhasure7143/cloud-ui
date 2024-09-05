import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordoldComponent } from './changepasswordold.component';

describe('ChangepasswordoldComponent', () => {
  let component: ChangepasswordoldComponent;
  let fixture: ComponentFixture<ChangepasswordoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepasswordoldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
