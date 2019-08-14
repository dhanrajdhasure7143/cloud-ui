import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BotcreateComponent } from './botcreate.component';


describe('WorkflowcreateComponent', () => {
  let component: BotcreateComponent;
  let fixture: ComponentFixture<BotcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
