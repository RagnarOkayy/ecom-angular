import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIndividualComponent } from './user-individual.component';

describe('UserIndividualComponent', () => {
  let component: UserIndividualComponent;
  let fixture: ComponentFixture<UserIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIndividualComponent]
    });
    fixture = TestBed.createComponent(UserIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
