import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CoreRoutingModule } from './core-routing.module';
import { ShoppingModule } from '../shopping/shopping.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    BsNavbarComponent
  ],
  imports: [
    CoreRoutingModule,
    SharedModule,
    ShoppingModule,
    FontAwesomeModule
    ],
  exports: [
    BsNavbarComponent,
    LoginComponent,
    HomeComponent,
  ]
})
export class CoreModule { }
