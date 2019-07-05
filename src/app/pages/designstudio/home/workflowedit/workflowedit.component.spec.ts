import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkfloweditComponent } from './workflowedit.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkfloweditComponent', () => {
  let component: WorkfloweditComponent;
  let fixture: ComponentFixture<WorkfloweditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkfloweditComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkfloweditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
