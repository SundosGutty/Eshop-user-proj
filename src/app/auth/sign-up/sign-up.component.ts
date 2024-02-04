import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/shared/models/user";
import { AuthService } from "src/app/shared/services/auth.service";
import { LocalstorageService } from "src/app/shared/services/localstorage.service";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
    selector: 'user-sign-up',
    templateUrl: './sign-up.component.html'

})
export class UserSignUpComponent{
    signUpForm: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are wrong';
    userSignUpSubscription: Subscription
    modifiedCountries = [];
    formFields: {}[] = []
    

    constructor(
      private formBuilder: FormBuilder,
      private auth: AuthService,
      private localstorageService: LocalstorageService,
      private router: Router,
      private usersService: UsersService
    ) {}
  
    ngOnInit(): void {
      this._initSignUpForm();
      this._getCountries()
    }
  
    private _initSignUpForm() {
      this.signUpForm = this.formBuilder.group({
          name: ['', Validators.required],
          password: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required],
          isAdmin: [false],
          street: [''],
          apartment: [''],
          zip: [''],
          city: [''],
          country: ['']
      });
    }

  
    onSubmit() {
      this.signUpForm.markAllAsTouched()
      if (this.signUpForm.invalid) return;
    
      const user: User = {
        id: null,
        name: this.signUpForm.get('name')?.value,
        password: this.signUpForm.get('password')?.value,
        email: this.signUpForm.get('email')?.value,
        phone: this.signUpForm.get('phone')?.value,
        isAdmin: this.signUpForm.get('isAdmin')?.value,
        street: this.signUpForm.get('street')?.value,
        apartment: this.signUpForm.get('apartment')?.value,
        zip: this.signUpForm.get('zip')?.value,
        city: this.signUpForm.get('city')?.value,
        country:this.signUpForm.get('country')?.value
      };
    
     this.userSignUpSubscription = this.usersService.createUser(user).subscribe(()=>{
        this.router.navigate(['']);
     })
     
    }
  
    get loginFormGroup() {
      return this.signUpForm.controls;
    }
  
    ngOnDestroy(): void {
      if (this.userSignUpSubscription) this.userSignUpSubscription.unsubscribe()
    }

    private _getCountries() {
        let countries = this.usersService.getCountries();
        this.modifiedCountries = countries.map(country => ({
         label: country.name,
         value: country.id
       }));
       this.formFields = [
         { label: 'Name', controlName: 'name', type: 'text', placeholder: 'Your name', colSpan: 10 },
         { label: 'Password', controlName: 'password', type: 'password', placeholder: 'password', colSpan: 10 },
         { label: 'Email', controlName: 'email', type: 'email', placeholder: 'email', colSpan: 10 },
         { label: 'Phone', controlName: 'phone', type: 'phone', placeholder: 'Phone', colSpan: 10 },
         { label: 'Country', controlName: 'country', type: 'select', options: this.modifiedCountries, colSpan: 10 },
         { label: 'Street', controlName: 'street', type: 'text', placeholder: 'Street', colSpan: 10 },
         { label: 'Apartment', controlName: 'apartment', type: 'number', placeholder: 'Apartment number', colSpan: 10 },
         { label: 'Zip', controlName: 'zip', type: 'number', placeholder: 'Zip code', colSpan: 10 },
         { label: 'City', controlName: 'city', type: 'text', placeholder: 'City', colSpan: 10 },
       ];
     }
}