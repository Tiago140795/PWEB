import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CashierComponent } from './cashier/cashier.component';
import { RegisterComponent } from './register/register.component';
import { WaiterComponent } from './waiter/waiter.component';
import { CookComponent } from './cook/cook.component';
import { BartenderComponent } from './bartender/bartender.component';

const routes: Routes = [
  {
      path: '',
      component: LoginComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  
  {
    path: 'cashier',
    component: CashierComponent,
  
  },

  {
    path: 'cook',
    component: CookComponent,
  
  },

  {
    path: 'bartender',
    component: BartenderComponent,
  
  },

  
  {
    path: 'waiter',
    component: WaiterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
