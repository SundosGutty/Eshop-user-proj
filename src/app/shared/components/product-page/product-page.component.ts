import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartItem } from '../../models/cart';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;
  hoverRating = 0;
  productImages: string[] = []

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };
    this.cartService.setCartItem(cartItem)
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
        this.productImages = this.product.images.map((image) => {
          const parts = image.split("uploads/");
          return  parts[1];
        });
      });
  }

}