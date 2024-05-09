import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmConfigurationListComponent } from './vm-configuration-list.component';

describe('VmConfigurationListComponent', () => {
  let component: VmConfigurationListComponent;
  let fixture: ComponentFixture<VmConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmConfigurationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VmConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
