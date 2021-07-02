import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContactsComponent } from './get-contacts.component';

describe('GetContactsComponent', () => {
  let component: GetContactsComponent;
  let fixture: ComponentFixture<GetContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
