import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Models/login/login.component';
import { ProductDetailComponent } from './Models/product-detail/product-detail.component';
import { ProductsComponent } from './Models/products/products.component';
import { CartComponent } from './Models/cart/cart.component';
import { AuthGuard } from './auth-guard';
import { ShipmentsListComponent } from './Models/shipments-list/shipments-list.component';
import { OrderHistoryComponent } from './Models/order-history/order-history.component';



const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path:'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
  {path:'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path:'shipments', component: ShipmentsListComponent, canActivate: [AuthGuard], data: { role: ['admin'] }},
  {path:'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
