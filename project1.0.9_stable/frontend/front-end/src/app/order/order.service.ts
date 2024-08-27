import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class OrderService {
    private orderUpdateSubject = new Subject<void>();

    //orderUpdated$ = this.orderUpdateSubject.asObservable();
    
    /*
    triggerOrderUpdate() {
        this.orderSubject.next();
      }
    */

  createOrder(tableNumber: string, selectedFoodItems: any[], selectedDrinkItems: any[]) {
    this.createOrder(tableNumber, selectedFoodItems, selectedDrinkItems);
  }

  
}
