import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { ProductsComponent } from './components/products/products.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';

import { AngularFireModule } from '@angular/fire'; 
import { AngularFireDatabaseModule } from '@angular/fire/database'; 
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SortTableDirective } from './directives/sort-table.directive';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductsComponent,
    MyOrderComponent,
    ShoppingCartComponent,
    OrderSuccessComponent,
    CheckOutComponent,
    BsNavbarComponent,
    ProductFormComponent,
    SortTableDirective,
    ProductCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
