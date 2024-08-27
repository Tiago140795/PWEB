import {Component,Inject,InjectionToken,OnInit,OnDestroy,} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderComponent } from '../order/order.component';
import { NotificationService } from '../notification/notificationService';
import { Observable, Subscription } from 'rxjs';

export const NAME_TOKEN = new InjectionToken<string>('NameToken');

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.scss'],
})
export class CookComponent implements OnInit, OnDestroy {
  private orderNotificationSubscription: Subscription = new Subscription();

  // Maintain a queue of food orders
  //cookOrderId = '0';
  preparationQueue: any[] = [];
  dishesQueue: any[] = [];
  readyQueue: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    console.log(`I WORK -> ngOnInit`);
    this.fetchNewOrders();
    this.orderNotificationSubscription = this.notificationService.orderNotification.subscribe((orderId) => {
      console.log(`New order with ID` + orderId + ` has been placed.`);
      //this.getOrderInfo(orderId); //If one day it decides to work
    });
  }

  ngOnDestroy() {
    this.orderNotificationSubscription.unsubscribe();
  }

  boxesVisible = true;
  queueBox = false;
  orderFoodVisible = true;

  tableNumber: string = '';
  dishName: string = '';
  waitername: string = '';

  myFunction() {
    console.log('This function will be executed after a delay');
  }

  // Set a timer to execute myFunction after 2000 milliseconds (2 seconds)
  delay = 10000;

  /*
  orderQueue() {
    this.boxesVisible = false;
    this.queueBox = true;
    console.log(this.preparationQueue);
    console.log(this.dishesQueue);
  }*/

  receiveOrder(order: OrderComponent): void {
    console.log(
      `Received order for Table ${order.getTableNumber}: ${order.getDishName}`
    );
    // You can add logic here to start preparing the dish
    // For example, mark the order as in-progress or update preparation time
  }



  sendOrderToWaiter(order: OrderComponent) {
    // Here, you can implement the logic to send the order to the waiter
    // This could involve making an HTTP request to a waiter's endpoint or using sockets for real-time updates
    console.log(
      `Sending completed order for Table ${order.getTableNumber} to waiter ${order.getWaiterName}.`
    );
  }

  async setIsPrepared(orderId: number, tableNumber: number, inPreparation :boolean) {
    if(inPreparation){ 
      console.log(`Order ${orderId} reservation status updated`);
     }else{
      console.log(orderId);
      const data = {
        orderId: orderId,
        tableNumber: tableNumber,
        inPreparation: true,
      };

      this.http
        .put(`http://localhost:9992/cook/order/dish/preparation/${orderId}`, data)
        .subscribe(
          (response: any) => {
            console.log(`Order ${orderId} reservation status updated`);
          },
          (error: any) => {
            console.error(
              `Error updating order ${orderId} reservation status:`,
              error
            );
          }
        );
     }
  }

  async setDishComplete(orderId: number, tableNumber: number, drinkComplete :boolean) {
    if(drinkComplete){
      console.log(`Somehow this order ${orderId} reservation status is already complete`);
    }else{
      console.log(orderId);
      const data = {
        orderId: orderId,
        tableNumber: tableNumber,
        dishComplete: true,
      };

      this.http
        .put(`http://localhost:9992/order/dish/complete/${orderId}`, data)
        .subscribe(
          (response: any) => {
            console.log(`Order ${orderId} completion status updated`);
          },
          (error: any) => {
            console.error(
              `Error updating order ${orderId} reservation status:`,
              error
            );
          }
        );
    }
  }

  /*
  async getOrderInfo(orderId: string) {
    console.log(orderId + 'Ive been summoned -> gerOrderInfo cookComp');
    this.getOrderById(orderId);
    //console.log(JSON.stringify(response)+'fetchFood response');
    //return response;
  }*/

  async fetchNewOrders() {
    const url = `http://localhost:9992/cook/order`;

    this.http.get<OrderComponent[]>(url).subscribe(
      (response) => {
        if(this.dishesQueue.length != response.length){
          this.dishesQueue = response; // Return the fetched order details
          console.log(JSON.stringify(this.dishesQueue) + ' dishes queue');
          alert("You got new Orders");
        }
      },
      (error) => {
        console.error('Error fetching order:', error);
        throw error; // You can handle the error in the calling code
      }
    );
  }

  async getOrderById(orderId: string) {
    const url = `http://localhost:9992/cook/order/${orderId}`;

    return this.http.get<OrderComponent>(url).subscribe(
      (response) => {
        // Add the response to the preparation queue
        this.dishesQueue.push(JSON.parse(JSON.stringify(response)));
        console.log(JSON.stringify(this.dishesQueue) + ' dishes queue');
        alert("You got new Orders");
        return response; // Return the fetched order details
      },
      (error) => {
        console.error('Error fetching order:', error);
        throw error; // You can handle the error in the calling code
      }
    );
  }

  async startPreparation() {
    console.log(this.dishesQueue);
    if (this.dishesQueue.length > 0) {
      const food = this.dishesQueue.pop();
      console.log(food);
      this.preparationQueue.unshift(food);

      this.setIsPrepared(food.orderId, food.tableNumber, food.inPreparation);
    }
    console.log(this.preparationQueue);
  }

  async ready() {
    console.log(this.preparationQueue);
    if (this.preparationQueue.length > 0) {
      const food = this.preparationQueue.pop();
      console.log(food);
      this.readyQueue.unshift(food);
      this.setDishComplete(food.orderId, food.tableNumber, food.drinkComplete);
      this.fetchNewOrders();
    }
    console.log(this.readyQueue);
  }

  async removeOrder() {
    if (this.readyQueue.length <= 0) {
      console.log('Ready order queue is empty');
    }else{
        
        this.readyQueue.pop()
        console.log("Item Removed")
    } 
  }

  logout() {
    // Perform any logout logic you need here
    // Then navigate to the login page
    this.router.navigate(['/login']);
  }
}