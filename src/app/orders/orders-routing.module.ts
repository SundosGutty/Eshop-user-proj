import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { UsersService } from '../shared/services/users.service';
import { CartCheckoutPageComponent } from './cart-checkout/cart-checkout.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ThankYouComponent } from '../shared/components/thank-you/thank-you.component';



const routes: Routes = [
  {
    path: '',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CartCheckoutPageComponent,
    providers: [UsersService],
    canActivate: [AuthGuard]
  },
  {
    path :'success',
    component: ThankYouComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EshopOrdersRoutingModule {}
