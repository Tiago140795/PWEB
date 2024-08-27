import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private orderNotificationSubject = new Subject<string>();
    private drinkNotificationSubject = new Subject<string>();
  
    orderNotification = this.orderNotificationSubject.asObservable();
    drinkNotification = this.drinkNotificationSubject.asObservable();
  
    sendOrderNotification(orderId: string) {
      try{
        console.log(orderId + `I WORK -> ngOnInit`);
        this.orderNotificationSubject.next(orderId);
        console.log(orderId + `I DID MY WORK -> ngOnInit`);
      }catch(error: any){
        console.error('Error in createOrderController:', error.message)
      }
    }
  
    sendDrinkNotification(orderId: string) {
      this.drinkNotificationSubject.next(orderId);
    }
  }
