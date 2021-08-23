import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodepropComponent } from './nodeprop.component';

describe('NodepropComponent', () => {
  let component: NodepropComponent;
  let fixture: ComponentFixture<NodepropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodepropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodepropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
