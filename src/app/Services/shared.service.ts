import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private refreshNavbarSubject = new BehaviorSubject<null>(null);
  refreshNavbar$ = this.refreshNavbarSubject.asObservable();

  triggerNavbarRefresh() {
    this.refreshNavbarSubject.next(null);
  }

  constructor() { }
}
