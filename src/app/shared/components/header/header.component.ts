import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  dialogContent!: {
    title: string,
    description?: string,
    buttons :    {
      title : string,
      class: string,
      response: boolean 
  }[]
  } | null

  constructor(cartService: CartService, private authService: AuthService, private localStorageService: LocalstorageService, private router: Router) {
    cartService.initCartLocalStorage();
  }


  logoutUser(){
   let isLoggedInUser =  this.localStorageService.isValidToken()
   if (isLoggedInUser){
     this.dialogContent = {
       title: 'Are you sure you would like to logout?', 
       buttons: [
         {
           title: 'Cancel', 
           class: 'btn btn-secondary',
           response: false
         },
          {
           title: 'Confirm',
           class: 'btn btn-primary',
           response: true
         }
       ]
     }
   }
   else this.router.navigate(['']);

  }

  shouldDelete(ans: boolean){
    this.dialogContent = null
    if (ans){
      this.logout()
    }
}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
