import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAgentsTabsComponent } from './ai-agents-tabs.component';

describe('AiAgentsTabsComponent', () => {
  let component: AiAgentsTabsComponent;
  let fixture: ComponentFixture<AiAgentsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiAgentsTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAgentsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
