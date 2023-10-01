import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
  
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService ,private router: Router){}

  ngOnInit(): void {
      this.registrationForm = this.fb.group({
        firstName:['', Validators.required],
        lastName:['', Validators.required],
        email:['', Validators.required],
        phoneNumber:['', Validators.required],
        address:['', Validators.required],
        password:['', Validators.required]
      })
  }

  onSubmit() {
    // Handle form submission here
    if (this.registrationForm.valid) {
      this.authenticationService.register(this.registrationForm.value)
      .subscribe((response) => {
        this.registrationForm.reset();
        this.router.navigate([''])
        console.log(this.registrationForm.valid)
      })
    } else {
      alert("Form is not valid")
    }
  }

}


