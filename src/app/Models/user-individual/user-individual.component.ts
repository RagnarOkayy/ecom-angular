import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShipmentService } from 'src/app/Services/shipment.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-user-individual',
  templateUrl: './user-individual.component.html',
  styleUrls: ['./user-individual.component.scss']
})
export class UserIndividualComponent implements OnInit{

  user = new User();
  passwordChange = new PasswordChange()
  userRole = localStorage.getItem('role')
  showPasswordForm = false;

  

  constructor(private route: ActivatedRoute, private userService: UserService, private shipmentService: ShipmentService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      this.userService.getUser(userId).subscribe((data) => {
        this.user = data;
      });
    });
  }

  onSubmit(): void{
    this.userService.postUserChanges(this.user).subscribe((res =>
      alert("Changes were submited")
      ))
  }

  changePassword(): void{
    this.userService.changePassword(this.user.id, this.passwordChange.oldPassword, this.passwordChange.newPassword)
    .subscribe(response => {
      console.log(this.passwordChange.oldPassword)
      console.log(this.passwordChange.newPassword)
      alert("Password were submited")
    })
  }

}

export class User {
  id: any;
  firstName: any;
  lastName: any;
  email: any;
  phoneNumber: any;
  address: any;
  role: any;
}

export class PasswordChange{
  oldPassword: any;
  newPassword: any;
}
