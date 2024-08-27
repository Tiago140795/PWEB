import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getFoodByName(name: any) {
    this.getFoodByName(name);
  }
  private orderSubject = new Subject<void>();

  // Observable for order updates
  orderUpdated$ = this.orderSubject.asObservable();

  // Method to trigger order update
  triggerOrderUpdate() {
    this.orderSubject.next();
  }
}
