
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  username: string = "";
  role: string = "";
  email: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
  }

  register() {
    let bodyData = 
    {
      "username" : this.username,
      "role" : this.role,
      "email" : this.email,
      "password" : this.password,
    };

    this.http.post("http://localhost:9992/user/create", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User Registered Successfully")
      this.router.navigateByUrl('/login');
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
