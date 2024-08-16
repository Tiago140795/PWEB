import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.scss']
})
export class CookComponent {
  constructor(private router: Router) {}

  logout() {
    // Perform any logout logic you need here
    // Then navigate to the login page
    this.router.navigate(['/login']);
  }
}
