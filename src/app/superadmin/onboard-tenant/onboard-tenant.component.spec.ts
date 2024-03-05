import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardTenantComponent } from './onboard-tenant.component';

describe('OnboardTenantComponent', () => {
  let component: OnboardTenantComponent;
  let fixture: ComponentFixture<OnboardTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardTenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
