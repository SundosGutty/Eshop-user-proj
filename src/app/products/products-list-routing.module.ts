import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from '../shared/components/product-page/product-page.component';
import { ProductsListUserComponent } from './products-list.component';



const routes: Routes = [
  {
    path: 'category/:categoryId',
    component: ProductsListUserComponent
  },
  {
    path :':productid',
    component: ProductPageComponent
  },
  {
    path: '',
    component: ProductsListUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EshopProductsListRoutingModule {}
