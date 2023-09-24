import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Models/login/login.component';
import { ProductDetailComponent } from './Models/product-detail/product-detail.component';
import { ProductsComponent } from './Models/products/products.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'products', component: ProductsComponent},
  {path:'products/:id', component: ProductDetailComponent} // Replace 'LoginComponent' with the actual name of your login component.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
