import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpasswordoldComponent } from './newpasswordold.component';

describe('NewpasswordoldComponent', () => {
  let component: NewpasswordoldComponent;
  let fixture: ComponentFixture<NewpasswordoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpasswordoldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpasswordoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
