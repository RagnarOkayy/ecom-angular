import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Models/login/login.component';
import { ProductDetailComponent } from './Models/product-detail/product-detail.component';
import { ProductsComponent } from './Models/products/products.component';
import { CartComponent } from './Models/cart/cart.component';
import { AuthGuard } from './auth-guard';
import { ShipmentsListComponent } from './Models/shipments-list/shipments-list.component';
import { OrderHistoryComponent } from './Models/order-history/order-history.component';
import { AddProductComponent } from './Models/add-product/add-product.component';
import { RegisterComponent } from './Models/register/register.component';
import { EditProductComponent } from './Models/edit-product/edit-product.component';
import { UserListComponent } from './Models/user-list/user-list.component';
import { UserIndividualComponent } from './Models/user-individual/user-individual.component';
import { UserShipmentsComponent } from './Models/user-shipments/user-shipments.component';




const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path:'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
  {path:'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path:'shipments', component: ShipmentsListComponent, canActivate: [AuthGuard], data: { role: ['admin'] }},
  {path:'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  {path:'add-product', component: AddProductComponent, canActivate: [AuthGuard], data: { role: ['admin'] }},
  {path:'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard], data: { role: ['admin'] }},
  {path:'register', component: RegisterComponent},
  {path:'userList', component: UserListComponent, canActivate: [AuthGuard], data: { role: ['admin'] }},
  {path:'userList/:id', component: UserIndividualComponent, canActivate: [AuthGuard]},
  {path:'user-shipments/:userId', component: UserShipmentsComponent, canActivate: [AuthGuard], data: { role: ['admin'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
