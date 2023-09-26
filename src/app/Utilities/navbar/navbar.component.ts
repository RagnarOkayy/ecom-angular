import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userDisplayName: string | null = null; // Initialize with null

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve the user's email from local storage
    const displayName = localStorage.getItem('displayName');

    if (displayName) {
      this.userDisplayName = displayName;
    }
  }

  logout(): void {
    // Clear values from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');

    // Redirect to the main page
    this.router.navigate(['/']); // Adjust the route to your main page
  }

}
