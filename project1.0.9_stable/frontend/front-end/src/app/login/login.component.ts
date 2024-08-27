
import { Component, Inject, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

//export const NAME_LOGIN_TOKEN = new InjectionToken<string>('NameLOGINToken');

export class LoginComponent {

  // Variables to hold user input
  username: string = '';
  password: string = '';
  isLogin: boolean = true;
  erroMessage: string = '';
  waiterName: string =  '';

  // Constructor for dependency injection
  constructor(private router: Router, private http: HttpClient,
              ) {}

  // Function to handle the login process
  login() {
    console.log(this.username);
    console.log(this.password);
    //this.waiterName=this.username;
    // Prepare data for login API call
    const bodyData = {
      username: this.username,
      password: this.password,
    };

    // Send login request to the server
    this.http.post("http://localhost:9992/user/login", bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      if (resultData.status) {
        const role = resultData.role; // Extract the user's role from the response
        if (role == 'waiter') {
          this.router.navigateByUrl('/waiter');
        } else if (role == 'cook') {
          this.router.navigateByUrl('/cook');
        } else if (role == 'bartender') {
          this.router.navigateByUrl('/bartender');
        } else if (role == 'cashier') {
          this.router.navigateByUrl('/cashier');
        }
      } else {
        // If login fails, show an error message
        alert("Incorrect Username or Password");
        console.log("Error login");
      }
    });
  }


  // Function to navigate to the registration page
  goToRegistration() {
    this.router.navigateByUrl('/register');
  }

  getUsername(){
    return this.waiterName;
  }
}


