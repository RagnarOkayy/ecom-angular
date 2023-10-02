import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userDisplayName: string | null = null; // Initialize with null
  userRole = localStorage.getItem('role');
  userId = localStorage.getItem('id');

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve the user's email from local storage
    const displayName = localStorage.getItem('displayName');

    if (displayName) {
      this.userDisplayName = displayName;
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToOrderHistory() {
    this.router.navigate(['/order-history']);
  }

  navigateToProfile() {
    this.router.navigate([`userList/${this.userId}`]);
  }

  navigateToUserList() {
    this.router.navigate([`userList`]);
  }

  navigateToShipments() {
    this.router.navigate([`shipments`]);
  }


  logout(): void {
    // Clear values from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');
    localStorage.removeItem('id')
    localStorage.removeItem('role')

    // Redirect to the main page
    this.router.navigate(['/']);
  }

}
