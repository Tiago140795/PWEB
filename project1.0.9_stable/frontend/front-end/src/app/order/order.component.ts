import { Component, Input, Injectable, InjectionToken, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../menu/menu.service';
import { OrderService } from './order.service';

export const TABLE_NUMBER_TOKEN = new InjectionToken<number>('TableNumberToken');
export const CAPACITY_TOKEN = new InjectionToken<number>('CapacicyToken');
export const WAITER_NAME_TOKEN = new InjectionToken<string>('WaiterName');
export const DISH_NAME_TOKEN = new InjectionToken<string>('DishName');
export const DRINK_NAME_TOKEN = new InjectionToken<string>('Drinkname');
export const ORDER_ID_TOKEN = new InjectionToken<number>('OrderId');



export class OrderComponent{
  
  private isComplete: boolean;
  //menuCompoment: any;
  

  constructor(@Inject(TABLE_NUMBER_TOKEN) private tableNumber: number,
              @Inject(CAPACITY_TOKEN) private capacity: number,
              @Inject(WAITER_NAME_TOKEN) private waiterName: string,
              @Inject(DISH_NAME_TOKEN) private dishName: string,
              @Inject(DRINK_NAME_TOKEN) private drinkName: string,
              @Inject(ORDER_ID_TOKEN)
              private orderId: number,
              private http: HttpClient,
              private menuService: MenuService,
              private orderService: OrderService
              ) {
  
    this.isComplete = false;
  }

  public getorderId(): number {
    return this.orderId;
  }

  public getTableNumber(): string {
    return `${this.tableNumber}`;
  }

  public getCapacity(): string {
    return `${this.capacity}`;
  }

  public getIsComplete(): boolean{
    return this.isComplete;
  }

  public setIsComplete(){
    this.isComplete = true;
  }

  public setIsIncomplete(){
    this.isComplete = false;
  }

  public getWaiterName(): string{
    return `${this.waiterName}`;
  }
  
  public getDishName(): string{
    return `${this.dishName}`;
  }

  public getDrinkName(): string{
    return `${this.drinkName}`;
  }

  async createOrder(tableNumber: string, selectedFoodItems: any[], selectedDrinkItems: any[]) {
    const url = `http://localhost:9992/waiter/orders`;

    const selectedFoodWithDetails = await Promise.all(selectedFoodItems.map(async (foodItem) => {
      const response = await this.menuService.getFoodByName(foodItem.name);
      return response;
    }));

    const selectedDrinksWithDetails = await Promise.all(selectedDrinkItems.map(async (drink) => {
      const response = await this.menuService.getFoodByName(drink.name);
      return response;
    }));

    const orderData = {
      tableNumber: tableNumber,
      foodItems: selectedFoodWithDetails,
      drinkItems: selectedDrinksWithDetails,
    };

    this.http.post(url, orderData).subscribe(
      (result) => {
        console.log('Order created successfully:', result);
        // Optionally, you can update the UI or perform other actions here
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}


