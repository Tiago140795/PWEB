import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})

export class CashierComponent {
  constructor(private router: Router, private http: HttpClient) {}

  logout() {
    // Perform any logout logic you need here
    // Then navigate to the login page
    this.router.navigate(['/login']);
  }

  deleteUserBoxVisible = false;
  ordersBoxVisible = true;
  deleteUserUsername: string = '';
  deleteUserEmail: string = '';

  openDeleteUserBox() {
    this.ordersBoxVisible = false;
    this.deleteUserBoxVisible = true;
    
  }

  closeDeleteUserBox() {
    this.deleteUserBoxVisible = false;
    this.ordersBoxVisible = true;
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
}
