
import { Component, Input, InjectionToken, Inject } from '@angular/core';
import { Router } from '@angular/router';

export const TABLE_NUMBER_TOKEN = new InjectionToken<number>('TableNumberToken');
export const CAPACITY_TOKEN = new InjectionToken<number>('CapacicyToken');

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  private isReserved: boolean = false;

  constructor(
    @Inject(TABLE_NUMBER_TOKEN) private tableNumber: number,
    @Inject(CAPACITY_TOKEN) private capacity: number
) {}

    

  public reserveTable(): void {
      if (!this.isReserved) {
          this.isReserved = true;
          console.log(`Table ${this.tableNumber} has been reserved.`);
      } else {
          console.log(`Table ${this.tableNumber} is already reserved.`);
      }
  }

  public setReserved(){
    this.isReserved = true;
  }

  public clearReserved(){
    this.isReserved = false;
  }

  public checkifReserved(): boolean{
    if (this.isReserved == true)
      return true;
    return false;
  }

  public releaseTable(): void {
      if (this.isReserved) {
          this.isReserved = false;
          console.log(`Table ${this.tableNumber} has been released.`);
      } else {
          console.log(`Table ${this.tableNumber} is already available.`);
      }
  }

  public getTableInfo(): string {
      return `Table ${this.tableNumber} | Capacity: ${this.capacity} | Reserved: ${this.isReserved ? 'Yes' : 'No'}`;
  }


  public getTableNumberfm(): number {
    return this.tableNumber;
  }

  public getTableNumber = this.getTableNumberfm;
  
}

// Example usage
/*
export const listTables: TableComponent[] = [];

const a = listTables[0]=new TableComponent(1, 2);
const b=new TableComponent(2, 2);
listTables[0]=new TableComponent(1, 4);
listTables[1]=new TableComponent(2, 6);
listTables[2]=new TableComponent(3, 4)
listTables[3]=new TableComponent(4, 2);
listTables[4]=new TableComponent(5, 4);

console.log(listTables.forEach); // Output: Table 1 | Capacity: 4 | Reserved: No

a.reserveTable();
console.log(a.getTableInfo()); // Output: Table 1 | Capacity: 4 | Reserved: Yes

a.releaseTable();
console.log(a.getTableInfo()); // Output: Table 1 | Capacity: 4 | Reserved: No

*/