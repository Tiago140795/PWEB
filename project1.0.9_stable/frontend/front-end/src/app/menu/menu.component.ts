import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class MenuComponent {
 
  constructor(private http: HttpClient) {}

  getFoodByName(foodName: string) {
    const url = `http://localhost:9992/waiter/foods/${foodName}`;
    
    return this.http.get(url);
  }
}
