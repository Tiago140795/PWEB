
import { TableComponent }from '../table/table.component'
import { OrderService } from '../order/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})

export class WaiterComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {}

  tables: TableComponent[] = []; //can give problems?
  tablesString: any[] = [];

  finishedDishes: any[] = [];
  finishedDrinks: any[] = [];

  private orderIdCounter: number = 1;
  private username: any = '';

  selectedFoodItems: any[] = [];
  selectedDrinkItems: any[] = [];

  formattedFoodList: any[] = [];
  formattedDrinkList: any[] = [];

  boxesVisible = true;
  menuVisible = false;
  orderFoodVisible = false;
  orderDrinksVisible = false;

  //Tables
  tablesVisible = false;
  delTablesVisible = false;
  freeTablesVisible = false;

  //See Finished Orders
  seeOrdersVisible = false;

  tableNumberCreate: string = '';
  tableNumberDelete: string = '';
  tableNumberFree: string = '';
  tableNumberOrders: string = '';
  tableSeats : string = '';
  tableReserved : string = 'false';
  waiterName : string = ''
  
  name: string = '';
  price : string = '';
  numberDish: string = '';

  predefinedDishes = [
    { name: 'beefFillet', displayName: 'Beef Fillet'},
    { name: 'mushRisotto', displayName: 'Mushroom Risotto' },
    { name: 'grilledSalmon', displayName: 'Grilled Salmon' },
    { name: 'lasagna', displayName: 'Lasagna' },
    { name: 'chickenMarsala', displayName: 'Chicken Marsala' },
    { name: 'penne', displayName: 'Spring Penne' },
    { name: 'eggTart', displayName: 'Egg Tart' },
    { name: 'cremeBrulee', displayName: 'Crème Brûlée' },
    { name: 'tiramisu', displayName: 'Tiramisu' },
    { name: 'fruitSalad', displayName: 'Fruit Salad' },
  ];

  predefinedDrinks = [
    { name: 'water', displayName: 'Water'},
    { name: 'coke', displayName: 'Coke' },
    { name: 'iceTea', displayName: 'Ice Tea' },
    { name: 'orangeJuice', displayName: 'Orange Juice' },
    { name: 'whiteWine', displayName: 'White Wine' },
    { name: 'redWine', displayName: 'Red Wine' },
    { name: 'aperol', displayName: 'Aperol' },
    { name: 'coffee', displayName: 'Coffee' },
  ];

  ngOnInit() {
    this.fetchTables();
    this.getFinishedDishes();
    this.getFinishedDrinks();
    
  }

  // ------------------- HEADER  ----------------------------------
  logout() {
    console.log("Enter")
    this.router.navigate(['/login']);
  }

 // ------------------- MENU INICIAL  ----------------------------------

 enterTables(){
  this.fetchTables();
  this.boxesVisible = false
  this.tablesVisible = true;
  this.menuVisible = false;
}

enterDelTables(){
  this.fetchTables();
  this.boxesVisible = false;
  this.menuVisible = false;
  this.delTablesVisible = true;
}

freeTables(){
  this.freeTable();
  this.fetchTables();
  this.boxesVisible = false;
  this.menuVisible = false;
  this.freeTablesVisible = true;
}

enterOrders(){
  this.boxesVisible = false
  this.tablesVisible = false;
  this.menuVisible = true;
}

SeeOrders(){
  this.getFinishedDishes();
  this.getFinishedDrinks();
  this.boxesVisible = false;
  this.tablesVisible = false;
  this.seeOrdersVisible = true;
}

goBack(){
  this.tablesVisible = false;
  this.boxesVisible = true;
  this.delTablesVisible = false;
  this.seeOrdersVisible = false;
  this.freeTablesVisible = false;

}


// ----------------------- TABLES  ----------------------------------------------------

createTable(){
  const parsedTableNumber = parseInt(this.tableNumberCreate, 10);
  const tableToUpdate = this.tablesString.find(tablestring => tablestring.tableNumber === parsedTableNumber);
  if(!tableToUpdate){
    try{
       // Assuming this.tableNumber is a string
      const parsedTableSeats = parseInt(this.tableSeats, 10);   // Assuming this.tableSeats is a string
      
      let bodyData = {
        "tableNumber" : parsedTableNumber,
        "capacity" : parsedTableSeats,
        "isReserved" : this.tableReserved,
      };
      
      console.log(bodyData , typeof(parsedTableNumber),typeof(parsedTableSeats),typeof(this.tableReserved)  + '\n');
      
      this.http.post("http://localhost:9992/waiter/tables", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Table Created Successfully")
        this.fetchTables();
        this.router.navigateByUrl('/waiter');
      });
      
    }catch(error) {
        console.log({ error: 'Failed to create table, waiter component\n' });
    }
  }else{
    console.log(`Table ${this.tableNumberCreate} already exists\n.`);
  }
}

fetchTables() {
  this.http.get<TableComponent[]>('http://localhost:9992/waiter/tables').subscribe(
    (tables) => {
      this.tables = (tables);
      this.tablesString = JSON.parse(JSON.stringify(tables));
      console.log(JSON.stringify(this.tables)); // Display the retrieved tables
    },
    (error) => {
      console.error('Error fetching tables:', error + '\n');
    }
  );
}

getFinishedDishes() {
  const url = `http://localhost:9992/waiter/order/dish`;
 
    this.http.get<OrderComponent[]>(url).subscribe(
      (response) => {
        if(this.finishedDishes.length != response.length){
          this.finishedDishes = response; // Return the fetched order details
          //console.log(JSON.stringify(this.finishedDishes) + ' dishes queue');
          alert("You got dishes ready")
        }
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
}

getFinishedDrinks() {
  const url = `http://localhost:9992/waiter/order/drink`

    this.http.get<OrderComponent[]>(url).subscribe(
      (response) => {
        if(this.finishedDrinks.length != response.length){
          this.finishedDrinks = response; // Return the fetched order details
        //console.log(JSON.stringify(this.finishedDrinks) + ' dishes queue');
          alert("You got drinks ready")
        }
        console.log('No new finished drinks')
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
}


deleteTable(){
  const parsedTableNumber = parseInt(this.tableNumberDelete, 10);
  console.log(parsedTableNumber);
  const tableToUpdate = this.tablesString.find(tablestring => tablestring.tableNumber === parsedTableNumber);
  if(tableToUpdate){
      this.http.delete(`http://localhost:9992/waiter/tables/delete/${parsedTableNumber}`).subscribe(
        (resultData) => {
          console.log(resultData);
          alert("Table deleted successfully")
          this.fetchTables();
        }
      ,(error)=> {
        console.error({ error: 'Failed to delete table\n' });;
      }
    );
  }else{
    console.log(`Table ${this.tableNumberCreate} does not exists\n.`);
  }
  
}

freeTable(){
  const tableNumber = parseInt(this.tableNumberFree, 10);
  console.log(tableNumber);
  const tableToUpdate = this.tablesString.find(tablestring => tablestring.tableNumber == tableNumber);
  if(tableToUpdate){
    if (tableToUpdate.isReserved == true) {

        const updatedTableData = {
          "tableNumber": tableNumber,
          "isReserved": false 
        };

        // Update the table on the server
        this.http.put(`http://localhost:9992/waiter/tables/reserved/${tableNumber}`, updatedTableData).subscribe(
          (updatedTable) => {
            console.log(`Table ${tableNumber} reservation status updated\n`);
          },
          (error) => {
            console.error(`Error updating table ${tableNumber} reservation status:`, error  + '\n');
          }
        );
      
    } else {
      console.log(`Table ${tableNumber} is already occupied\n.`);
    }
  }else{
    console.log(`Table ${tableNumber} not found\n.`);
  }
}


// ------------------------- NEW ORDERS  ----------------------------------------------------------

orderFoodBtn(){
  this.boxesVisible = false
  this.tablesVisible = false;
  this.menuVisible = false;
  this.orderFoodVisible = true;
}

orderDrinksBtn(){
  this.boxesVisible = false
  this.tablesVisible = false;
  this.menuVisible = false;
  this.orderDrinksVisible = true;
}

saveMenu2(){
  //this.saveDishes2();
  //this.saveDrinks2();
  this.menuVisible = false;
  this.boxesVisible = true;
}

sendOrder2(){
  const tableNumber = this.tableNumberOrders
  try{
    this.createOrderForTable(tableNumber);
  

    this.changeTableReservationTrue(tableNumber);
    

  }catch(error){
    console.log(error,"Erro creating order -> waiterComponent\n")
  }
  
  //this.clearFormatedItemLists();
 
  this.boxesVisible = true;
  this.menuVisible = false;
  this.fetchTables();
}

async clearFormatedItemLists(){
  this.formattedDrinkList = [];
  this.formattedFoodList = [];
}

async createOrderForTable(tableNumber: string) {
  const tableToUpdate = this.tablesString.find(tablestring => tablestring.tableNumber == tableNumber);
  console.log(tableNumber);
  if(tableToUpdate){
    if (tableToUpdate.isReserved == false){ 
      if(this.formattedFoodList.length>0 || this.formattedDrinkList.length>0){
        const url = `http://localhost:9992/waiter/order`;
        
        console.log(this.formattedDrinkList,'formattedDrinkList')

        const dishItemPromises =  await this.fetchDishDetails();
        const drinkItemPromises = await this.fetchDrinkDetails();

        console.log(JSON.stringify(drinkItemPromises));
        let noDish = false;
        let noDrink = false;

        if(dishItemPromises.length<=0){
          noDish = true;
        }
        if(drinkItemPromises.length<=0){
          noDrink = true;
        }        
        const orderId = this.generateOrderId();

        const orderData = {
          "orderId": orderId,
          "tableNumber": tableNumber,
          "dishes": dishItemPromises,
          "drinks": drinkItemPromises,
          "dishComplete": noDish,
          "drinkComplete": noDrink
        };
        
        this.http.post(url, orderData).subscribe(
          (result) => {
            console.log('Order created successfully:', result  + '\n');
            alert("Order Created Successfully")
          },
          (error) => {
            console.error('Error creating order:', error  + '\n');
          }
        );

        if(dishItemPromises.length<=0){
          this.setDishComplete(orderId);
        }
        if(drinkItemPromises.length<=0){
          this.setDrinkComplete(orderId);
        }
        this.clearFormatedItemLists();
      }
    }else{
      console.log(`Table ${tableNumber} is already taken.\n.`);
    }
  }else{
    console.log(`Table ${tableNumber} not found.\n.`);
  }
}

//Get all dish details from DB
async fetchDishDetails() {
  console.log(this.formattedFoodList);
  const selectedFoodWithDetails = await Promise.all(
    this.formattedFoodList.map(async (foodItem) => {
      console.log(foodItem, foodItem.name, 'dishItems details')
      const response = await this.getFoodByName(foodItem.name);
      console.log(JSON.stringify(response)+'fetchFood response\n');
      return response;
    })
  );

  console.log('Selected food details:', selectedFoodWithDetails  + '\n');
  return selectedFoodWithDetails; // Add this line to return the result
}

//Get all fish details from DB
async fetchDrinkDetails() {
  console.log(this.formattedDrinkList);
  const selectedDrinkWithDetails = await Promise.all(
    this.formattedDrinkList.map(async (foodItem) => {
      console.log(foodItem, foodItem.name, 'drinkItems details')
      const response = await this.getFoodByName(foodItem.name);
      console.log(JSON.stringify(response)+'fetchFood response\n');
      return response;
    })
  );

  console.log('Selected food details:', selectedDrinkWithDetails + '\n');
  return selectedDrinkWithDetails; // Add this line to return the result
}

async getFoodByName(foodName: string) {
  const url = `http://localhost:9992/waiter/menu/food/${foodName}`;
  
  try {
    const response = await this.http.get(url).toPromise();
    const foodDetails = response as any; // Modify this line to match the response structure
    console.log(JSON.stringify(foodDetails)+'geFoodByName response\n');
    return foodDetails; // Return the extracted food details
  } catch (error) {
    console.error('Error fetching food:', error  + '\n');
    throw error; // You can handle the error in the calling code
  }
}

generateOrderId(): number {
  const orderId = this.orderIdCounter;
  this.orderIdCounter++;
  return orderId;
}

getWaiterName(){
  //this.waiterName = this.username.getUsername();
  console.log(this.waiterName, this.username.waiterName + 'Im a genious');
}

changeTableReservationTrue(tableNumber: string) {

  const tableToUpdate = this.tablesString.find(tablestring => tablestring.tableNumber == tableNumber);
  console.log(tableToUpdate);
  if(tableToUpdate){
    if (tableToUpdate.isReserved == false) {
      if(this.formattedFoodList.length>0 || this.formattedDrinkList.length>0){
        const updatedTableData = {
          "tableNumber": tableNumber,
          "isReserved": true 
        };

        // Update the table on the server
        this.http.put(`http://localhost:9992/waiter/tables/reserved/${tableNumber}`, updatedTableData).subscribe(
          (updatedTable) => {
            console.log(`Table ${tableNumber} reservation status updated\n`);
          },
          (error) => {
            console.error(`Error updating table ${tableNumber} reservation status:`, error  + '\n');
          }
        );
      }
    } else {
      console.log(`Table ${tableNumber} is already occupied\n.`);
    }
  }else{
    console.log(`Table ${tableNumber} not found\n.`);
  }
}

changeTableReservationFalse(tableNumber: number) {

  const tableToUpdate = this.tablesString.find(tablestring => tablestring.tableNumber === tableNumber);
  //console.log(tableToUpdate);
  if(tableToUpdate){
    if (tableToUpdate.isReserved == true) {
      const updatedTableData = {
        "tableNumber": tableNumber,
        "isReserved": false 
      };

      // Update the table on the server
      this.http.put(`http://localhost:9992/waiter/tables/${tableNumber}`, updatedTableData).subscribe(
        (updatedTable) => {
          console.log(`Table ${tableNumber} reservation status updated\n`);
        },
        (error) => {
          console.error(`Error updating table ${tableNumber} reservation status:`, error  + '\n');
        }
      );
    } else {
      console.log(`Table ${tableNumber} is already free\n.`);
    }
  }else{
    console.log(`Table ${tableNumber} not found\n.`);
  }
}


// --------------------- ORDER FOOD  ------------------------------------------------------------

  selectFoodItem(dish: any) {
    this.selectedFoodItems.push(dish);
  }

  saveFood() {
      // Display the selected food items in the console
      console.log('Selected Food Items:', this.selectedFoodItems  + '\n');
    
      // Create an object to store the count of each food item
      let foodItemCounts: { [foodName: string]: number } = {};
    
      // Populate the foodItemCounts object
      for (let food of this.selectedFoodItems) {
        if (foodItemCounts[food]) {
          foodItemCounts[food]++;
        } else {
          foodItemCounts[food] = 1;
        }
      }
    
      // Convert the foodItemCounts object into an array of objects
      //let formattedFoodList = [];
      for (let foodName in foodItemCounts) {
        this.formattedFoodList.push({ name: foodName, count: foodItemCounts[foodName] });
      }
    
      // Display the formatted food list in the console
      console.log('Formatted Food List:', this.formattedFoodList  + '\n');
    
      // Clear the selected food items after processing
      this.selectedFoodItems = [];
    
      // Hide the current box and show the previous box
      this.orderFoodVisible = false;
      this.menuVisible = true;
  }

  async setDishComplete(orderId: number) {
      console.log(orderId);
      const data = {
        orderId: orderId,
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

  // ------------------------------- ORDER DRINKS  -------------------------------------------------

  selectDrinkItem(drink: any) {
    this.selectedDrinkItems.push(drink);
  }

  saveDrinks(){
    // Display the selected food items in the console
    console.log('Selected Drink Items:', this.selectedDrinkItems  + '\n');
 
    // Create an object to store the count of each food item
    let drinkItemCounts: { [drinkName: string]: number } = {};
  
    // Populate the drinkItemCounts object
    for (let drink of this.selectedDrinkItems) {
      if (drinkItemCounts[drink]) {
        drinkItemCounts[drink]++;
      } else {
        drinkItemCounts[drink] = 1;
      }
    }
  
    // Convert the foodItemCounts object into an array of objects
    //let formattedDrinkList = [];
    for (let drinkName in drinkItemCounts) {
     this.formattedDrinkList.push({ name: drinkName, count: drinkItemCounts[drinkName] });
    }
  
    // Display the formatted food list in the console
    console.log('Formatted Drink List:', this.formattedDrinkList  + '\n');
    console.log('Formatted Drink List:', this.formattedDrinkList.length  + '\n');
  
    // Clear the selected food items after processing
    this.selectedDrinkItems = [];
  
    // Hide the current box and show the previous box
    this.orderDrinksVisible = false;
    this.menuVisible = true;
 }

 async setDrinkComplete(orderId: number) {
    console.log(orderId);
    const data = {
      orderId: orderId,
      drinkComplete: true,
    };

    this.http
      .put(`http://localhost:9992/order/drink/complete/${orderId}`, data)
      .subscribe(
        (response: any) => {
          console.log(`Order ${orderId} completion status updated`);
        },
        (error: any) => {
          console.error(
            `Error updating order ${orderId} reservation status:`,
            error
          );
        });
}


  return() {
    this.orderFoodVisible = false;
    this.orderDrinksVisible = false;
    this.menuVisible = true;
  }
 

  // ---------------------------------------------------------------------------------------------------------
  
  saveDishes2() {
      console.log(this.predefinedDishes + '\n');
      let orderData = {
        "selectedFoodItems": this.predefinedDishes,
    };

    
    // Send the order data to the server using HTTP POST request
    this.http.post('http://localhost:9992/waiter/menu/food', orderData).subscribe(
      (response) => {
        console.log('Food order sent successfully\n', response);
        // Handle success: Clear selectedFoodItems and reset UI states
        this.selectedFoodItems = []; // Clear selected items
      },
      (error) => {
        console.error('Error sending food order\n', error);
        // Handle error: Log the error and potentially display an error message to the user
      }
    );
  }

  saveDrinks2() {
    console.log(this.predefinedDrinks + '\n');
    let orderData = {
      "selectedDrinkItems": this.predefinedDrinks,
  };

  this.http.post('http://localhost:9992/waiter/menu/drink', orderData).subscribe(
    (response) => {
      console.log('Drinks saved successfully\n', response);
    
      this.selectedDrinkItems = [];
    },
    (error) => {
      console.error('Error saving drinks\n', error);
      
    }
  );
}  
  
}