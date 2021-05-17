import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgatewayPageComponent } from './badgateway-page.component';

describe('BadgatewayPageComponent', () => {
  let component: BadgatewayPageComponent;
  let fixture: ComponentFixture<BadgatewayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgatewayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgatewayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
