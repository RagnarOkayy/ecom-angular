import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    userList: any[] = [];

    constructor(private userService: UserService, private router: Router){}

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe((data) => {
          this.userList = data;
          this.sortUserListById();
        })
    }

    navigateToUser(productId: number) {
      // Construct the URL with the product ID and navigate to it
      this.router.navigate(['/userList', productId]);
    }

    navigateToShipments(userId: number) {
      // Construct the URL with the product ID and navigate to it
      this.router.navigate(['/user-shipments', userId]);
    }

    sortUserListById() {
      this.userList.sort((a, b) => a.id - b.id); // Sort by ID in ascending order
    }
    
}
