import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
    {
      path: 'home-page',
      loadChildren: () =>
        import('./home-page/home-page.module').then((m) => m.AdminUsersdModule),
    },
    {
        path: 'products',
        loadChildren: () =>
          import('./products/products-list.module').then((m) => m.EshopProductsListModule),
    },
    {
      path: 'orders',
      loadChildren: () =>
      import('./orders/orders.module').then((m) => m.EshopOrdersModule),
    },
    {
      path: '',
      loadChildren: () =>
        import('./auth/auth.module').then((m) => m.AdminAuthdModule),
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
