import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.scss']
})
export class BartenderComponent {
  constructor(private router: Router) {}

  logout() {
    // Perform any logout logic you need here
    // Then navigate to the login page
    this.router.navigate(['/login']);
  }
}
