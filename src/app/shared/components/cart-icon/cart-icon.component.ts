import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html'
})
export class CartIconComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

   ngOnInit() {
      this.cartService.cart$.subscribe((cart) => {
        this.cartCount = cart?.items?.length ?? 0;

      })
  }

}
