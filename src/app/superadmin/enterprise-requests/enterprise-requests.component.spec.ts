import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseRequestsComponent } from './enterprise-requests.component';

describe('EnterpriseRequestsComponent', () => {
  let component: EnterpriseRequestsComponent;
  let fixture: ComponentFixture<EnterpriseRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
