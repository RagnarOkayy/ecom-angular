import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./Services/authentication.service"

@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      // If not authenticated, redirect to the login page or any other appropriate route
      this.router.navigate(['login']);
      return false; // Forbid access
    }

    const requiredRole = route.data?.['role'];

    if (requiredRole && !this.checkUserRole(requiredRole)) {
      // If the required role is defined and the user doesn't have it, redirect to a forbidden page or show an error message
      this.router.navigate(['forbidden']); // You can create a forbidden page or route
      return false; // Forbid access
    }

    return true; // Allow access
  }

  private checkUserRole(requiredRole: string | string[]): boolean {
    const userRole = localStorage.getItem('role'); // Get the user's role from localStorage

    if (userRole === null) {
      return false; // Handle the case where 'role' is not set in localStorage
    }

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    } else {
      return userRole === requiredRole;
    }
  }
}

