import { Component , OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/Services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  users: any[] = [];

  constructor(private loginService: LoginServiceService ){}

  ngOnInit(): void {
    this.loginService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

}
