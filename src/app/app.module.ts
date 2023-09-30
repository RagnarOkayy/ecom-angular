import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Models/login/login.component';
import { ProductDetailComponent } from './Models/product-detail/product-detail.component';
import { ProductsComponent } from './Models/products/products.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Utilities/navbar/navbar.component';
import { CartComponent } from './Models/cart/cart.component';
import { ShipmentsListComponent } from './Models/shipments-list/shipments-list.component';
import { OrderHistoryComponent } from './Models/order-history/order-history.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductDetailComponent,
    ProductsComponent,
    NavbarComponent,
    CartComponent,
    ShipmentsListComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
