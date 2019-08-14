import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { BoteditComponent } from './botedit.component';

describe('WorkfloweditComponent', () => {
  let component: BoteditComponent;
  let fixture: ComponentFixture<BoteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoteditComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
