import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userDisplayName: string | null = null; // Initialize with null
  userRole = localStorage.getItem('role');
  userId = localStorage.getItem('id');
  
  refreshSubscription!: Subscription;

  constructor(private router: Router, private sharedService: SharedService) { }

  
  ngOnInit(): void {

    this.refreshSubscription = this.sharedService.refreshNavbar$.subscribe(() => {
      this.userRole = localStorage.getItem('role');
      this.userId = localStorage.getItem('id');
      const displayName = localStorage.getItem('displayName');

      if (displayName) {
        this.userDisplayName = displayName;
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
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

    this.sharedService.triggerNavbarRefresh();

    // Redirect to the main page
    this.router.navigate(['/']);
  }

}
