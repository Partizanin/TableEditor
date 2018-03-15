import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ControllPannaleComponent} from './controll-pannale.component';

describe('ControllPannaleComponent', () => {
  let component: ControllPannaleComponent;
  let fixture: ComponentFixture<ControllPannaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControllPannaleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllPannaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
