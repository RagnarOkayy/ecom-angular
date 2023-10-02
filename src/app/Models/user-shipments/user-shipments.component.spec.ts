import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShipmentsComponent } from './user-shipments.component';

describe('UserShipmentsComponent', () => {
  let component: UserShipmentsComponent;
  let fixture: ComponentFixture<UserShipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserShipmentsComponent]
    });
    fixture = TestBed.createComponent(UserShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
