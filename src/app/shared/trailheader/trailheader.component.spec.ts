import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailheaderComponent } from './trailheader.component';

describe('TrailheaderComponent', () => {
  let component: TrailheaderComponent;
  let fixture: ComponentFixture<TrailheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
