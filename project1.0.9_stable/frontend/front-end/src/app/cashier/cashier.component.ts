import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})

export class CashierComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private http: HttpClient) {}


  // Variables to hold user input
  tableNumber: string = '';
  tablesString: any[] = [];
  orderItems: any[] = []; // Array to store order items
  totalBill: number = 0

  newOrdersQueue: any[] = [];
  preparationQueue: any[] = [];
  readyQueue: any[] = [];
  totatBill: number = 0;
  totalBillDay: number = 0;


  deleteUserBoxVisible = false; // Header
  menuVisible = true; // Menu
  tablesFoodInPreparationVisible = false; // Tables (Orders)
  tableOccupationVisible = false; // Tables (Occupation)
  waiterPerTableVisible = false; // Waiter
  kitchenQueuesVisible = false; // Kitchen Queues
  orderFoodVisible = true; // Orders Kitchen

  tableReceiptVisible = false; // Receipt (Table)
  showBillsTable = false; // Receipt (Table)
  showBillsDay = false;  // Receipt (Day)
  

  deleteUserUsername: string = '';
  deleteUserEmail: string = '';
  orderIdDelete: string = '';

  // ---------------- HEADER ---------------------
  openDeleteUserBox() {
    this.menuVisible = false;
    this.deleteUserBoxVisible = true;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  // ---------------- ONINIT ONDESTROY ----------------
  ngOnInit() {
    console.log(`I WORK -> ngOnInit`);
    this.getTables();
    this.fetchAllOrders();
    
  }

  ngOnDestroy() {
    
  }

  // ---------------- DELETE USER ---------------------

  closeDeleteUserBox() {
    this.deleteUserBoxVisible = false;
    this.menuVisible = true;
    this.deleteUserUsername = '';
    this.deleteUserEmail = '';
  }

  deleteConfirmed() {
    const bodyData = {
      username: this.deleteUserUsername,
      email: this.deleteUserEmail
    };

    this.http.post("http://localhost:9992/user/delete", bodyData).subscribe((resultData: any) => {
    console.log(resultData); // Log the response
    if (resultData.status) {
        alert("User deleted successfully");
        this.closeDeleteUserBox();
      } else {
        alert("Error deleting user");
      }
    });
  }


  // --------------- MENU BOXES -----------------------------------

  ordersPrep(){
    this.menuVisible = false;
    this.tablesFoodInPreparationVisible = true;
    
  }

  occupation(){
    this.menuVisible = false;
    this.tableOccupationVisible = true;
  }

  waiterTables(){
    this.menuVisible = false;
    this.waiterPerTableVisible = true;
    this.getCompletedOrders();
  }

  kitchenPrep(){
    this.menuVisible = false;
    this.kitchenQueuesVisible = true;
  }

  receiptTable(){
    this.menuVisible = false;
    this.tableReceiptVisible = true;
  }

  receiptDay(){
    this.menuVisible = false;
    this.showBillsDay = true;
  }

  // --------------- TABLES -----------------------------------


  getTables() {
    this.http.get<any[]>('http://localhost:9992/waiter/tables').subscribe(
      (tables) => {
        this.tablesString = tables;
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  returnFromTable1(){
    this.tablesFoodInPreparationVisible = false;
    this.menuVisible = true;
  }

  returnFromTable2(){
    this.tableOccupationVisible = false;
    this.menuVisible = true;

  }
  //--------------- ORDERS ------------------------------------

  async fetchAllOrders() {
    const url = `http://localhost:9992/waiter/order`;

    this.http.get<OrderComponent[]>(url).subscribe(
      (response) => {
        // Add the response to the preparation queue
        this.newOrdersQueue = response; // Return the fetched order details
        console.log(JSON.stringify(this.newOrdersQueue) + ' dishes queue');
        //return response;
      },
      (error) => {
        console.error('Error fetching order:', error);
        throw error; // You can handle the error in the calling code
      }
    );
  }

  async deleteOrder(){
    const orderId = parseInt(this.orderIdDelete);
  console.log(orderId);
  const orderToUpdate = this.newOrdersQueue.find(newOrder => newOrder.orderId === orderId);
  if(orderToUpdate){
      this.http.delete(`http://localhost:9992/cashier/order/delete/${orderId}`).subscribe(
        (resultData) => {
          console.log(resultData);
          alert("order deleted successfully")
          this.fetchAllOrders();
        }
      ,(error)=> {
        console.error('Failed to delete order', error );
      }
    );
  }else{
    console.log(`Order ${orderId} does not exists\n.`);
  }
  }


  // --------------- WAITER -----------------------------------

  returnFromWaiter(){
    this.waiterPerTableVisible = false;
    this.menuVisible = true;
  }

  async getCompletedOrders(){
    const url = `http://localhost:9992/waiter/order/finished`;

    this.http.get<OrderComponent[]>(url).subscribe(
      (response) => {
        // Add the response to the preparation queue
        this.readyQueue = response; // Return the fetched order details
        console.log(JSON.stringify(this.newOrdersQueue) + ' dishes queue');
        //return response;
      },
      (error) => {
        console.error('Error fetching order:', error);
        throw error; // You can handle the error in the calling code
      }
    );
  }

  // ---------- KITCHEN PREPARATION ----------------------------

  returnFromKitchen(){
    this.kitchenQueuesVisible = false;
    this.menuVisible = true;
  }

  // -------------- RECEIPT BOX ----------------------------
  // -------------- RECEIPT FOR TABLE -----------------------

  async searchTable() {

    if (!this.tableNumber) {
      alert('Please enter a table number.');

      return;
    }

    this.tableReceiptVisible = false;
    this.showBillsTable = true;
    this.menuVisible = false;

    console.log('DoneReceiptTable button clicked');
    console.log('Table Number:', this.tableNumber);

      // Fetch order details from the server based on tableNumber
    this.http.get<OrderComponent[]>(`http://localhost:9992/waiter/order/table/${this.tableNumber}`).subscribe(
      (orderResponse)=>{
        console.log(orderResponse, typeof(orderResponse) + '<- orderResponse')
        if (orderResponse) {
          this.orderItems = orderResponse;

          console.log(this.orderItems,' <- orderItems entries' )
          console.log(typeof(this.orderItems),' <- orderItems type');
          this.orderItems = this.orderItems.flatMap((order: { dishes: any ; drinks: any; }) => [...order.dishes, ...order.drinks]);
          console.log(this.orderItems, ' <- orderItems')
          this.totalBill = this.calculateTotalBill(this.orderItems);
          this.totalBillDay = this.totalBillDay + this.totalBill;
        } else {
          this.orderItems = [];
          this.totalBill = 0;
        }
      },
      (error)=> {
        console.error('Error fetching order details:', error);
        // Handle error as needed
      });
  }
  

  calculateTotalBill(orderItems: any[]): number {
    console.log(orderItems.reduce((total, item) => total + (item.price * (item.quantity+1)), 0), ' <-reduce')
    return orderItems.reduce((total, item) => total + (item.price * (item.quantity+1)), 0);
  }
  
  returnFromReceiptTable(){
    this.showBillsTable = false;
    this.tableReceiptVisible = true;
  }

  returnFromReceipt1(){
    this.tableReceiptVisible = false;
    this.menuVisible = true;
  }

  doneReceiptTable(){
    this.tableReceiptVisible = false;
    this.menuVisible = true;
  }


  // -------------- RECEIPT FOR DAY -----------------------
 
  returnFromReceiptDay(){
    this.showBillsDay = false;
    this.menuVisible = true;
  }


}
