import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EshopOrdersRoutingModule } from './orders-routing.module';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { UsersFacade } from '../shared/state/users.facade';
import { CartCheckoutPageComponent } from './cart-checkout/cart-checkout.component';
import { ThankYouComponent } from '../shared/components/thank-you/thank-you.component';


@NgModule({
  declarations: [
    OrderSummaryComponent,
    CartPageComponent,
    CartCheckoutPageComponent,
    ThankYouComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    EshopOrdersRoutingModule
  ],
  providers: [
    UsersFacade,
  ],
})
export class EshopOrdersModule {}
