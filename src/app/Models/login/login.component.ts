import { Component , OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup , Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/validateform';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    private auth : AuthenticationService,
    private router : Router,
    ) { }

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
  
    }

    onLogin() {
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
  
        this.auth.login(this.loginForm.value).subscribe({
          next: (res) => {
            // Extract userId from response
  
            localStorage.clear();
            const response = this.getDecodedAccessToken(res.token);
            const email = response.Email;
  
            // Store userId in local storage
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', email);
            console.log(res.token);
            console.log(email);
  
            this.loginForm.reset();
            this.router.navigate(['products']);
          },
          error: (err) => {
            alert(err?.error.message);
          },
        });
      } else {
        ValidateForm.validateAllFormFields(this.loginForm);
        alert('Your form is invalid');
      }
  
    }
    getDecodedAccessToken(token: string): any {
      try {
        return jwt_decode(token);
      } catch(Error) {
        return null;
      }
  
    }

}