import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedBotsTemplateComponent } from './predefined-bots-template.component';

describe('PredefinedBotsTemplateComponent', () => {
  let component: PredefinedBotsTemplateComponent;
  let fixture: ComponentFixture<PredefinedBotsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedBotsTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedBotsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
