import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductsListUserComponent } from './products-list.component';
import { EshopProductsListRoutingModule } from './products-list-routing.module';



@NgModule({
  declarations: [
    ProductsListUserComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    EshopProductsListRoutingModule
  ]
})
export class EshopProductsListModule {}
