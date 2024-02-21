import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCustomersComponent } from './enterprise-customers.component';

describe('EnterpriseCustomersComponent', () => {
  let component: EnterpriseCustomersComponent;
  let fixture: ComponentFixture<EnterpriseCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
