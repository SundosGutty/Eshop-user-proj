import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent {
  @Input() product: Product;
  image: string

  constructor(private cartService: CartService) {}


  ngOnInit(){
   const match = this.product.image.match(/uploads\/([^\/-]+)/);
   const firstWordAfterUploads = match && match[1];
   this.image = firstWordAfterUploads 
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
}
