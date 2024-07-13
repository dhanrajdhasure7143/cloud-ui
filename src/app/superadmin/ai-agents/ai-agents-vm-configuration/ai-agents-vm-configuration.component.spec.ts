import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentsVmConfigurationComponent } from './ai-agents-vm-configuration.component';

describe('AiAgentsVmConfigurationComponent', () => {
  let component: AiAgentsVmConfigurationComponent;
  let fixture: ComponentFixture<AiAgentsVmConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentsVmConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentsVmConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
