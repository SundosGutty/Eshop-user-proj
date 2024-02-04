import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Cart } from '../../shared/models/cart';
import { Order } from '../../shared/models/order';
import { OrderItem } from '../../shared/models/order-item';
import { CartService } from '../../shared/services/cart.service';
import { OrdersService } from '../../shared/services/orders.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './cart-checkout.component.html'
})
export class CartCheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];
  unsubscribe$: Subject<any> = new Subject();
  modifiedCountries = [];
  formFields: {}[] = []

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}


  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private async _autoFillUserData() {
    try {
      const user = await this.usersService.getUserFromToken();
  
      if (user) {
        this.userId = user.id;
        this.checkoutForm['name'].setValue(user.name);
        this.checkoutForm['email'].setValue(user.email);
        this.checkoutForm['phone'].setValue(user.phone);
        this.checkoutForm['city'].setValue(user.city);
        this.checkoutForm['street'].setValue(user.street);
        this.checkoutForm['country'].setValue(user.country);
        this.checkoutForm['zip'].setValue(user.zip);
        this.checkoutForm['apartment'].setValue(user.apartment);
      }
    } catch (error) {
      console.error('Error auto-filling user data', error);
    }
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
    this.modifiedCountries = this.countries.map(country => ({
     label: country.name,
     value: country.id
   }));
   this.formFields = [
    { label: 'Name', controlName: 'name', type: 'text', placeholder: 'Category name', colSpan: 3 },
    { label: 'Email', controlName: 'email', type: 'email', placeholder: 'Product price', colSpan: 3 },
    { label: 'Phone', controlName: 'phone', type: 'phone', placeholder: 'Product count in stock', colSpan: 3 },
    { label: 'Country', controlName: 'country', type: 'select', options: this.modifiedCountries, colSpan: 3 },
    { label: 'Street', controlName: 'street', type: 'text', placeholder: 'Select an image', accept: 'image/*', colSpan: 3 },
    { label: 'Apartment', controlName: 'apartment', type: 'text', placeholder: 'Category description', colSpan: 3 },
    { label: 'Zip', controlName: 'zip', type: 'number', placeholder: '', colSpan: 3 },
    { label: 'City', controlName: 'city', type: 'text', placeholder: '', colSpan: 3 },
  ];
  }

  backToCart() {
    this.router.navigate(['/orders']);
  }

  placeOrder() {
    this.checkoutFormGroup.markAllAsTouched()
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutFormGroup.get('street').value,
      shippingAddress2: this.checkoutFormGroup.get('apartment').value,
      city: this.checkoutFormGroup.get('city').value,
      zip: this.checkoutFormGroup.get('zip').value,
      country: this.checkoutFormGroup.get('country').value,
      phone: this.checkoutFormGroup.get('phone').value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        this.cartService.emptyCart();
        this.router.navigate(['orders/success']);
      },
      (err) => {
        console.log(err)
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
