import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmquantityComponent } from './smquantity.component';

describe('SmquantityComponent', () => {
  let component: SmquantityComponent;
  let fixture: ComponentFixture<SmquantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmquantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmquantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
