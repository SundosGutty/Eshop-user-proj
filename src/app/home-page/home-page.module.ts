import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EshopUserHomePage } from './home-page.component';
import { EshopUsersHomePageRoutingModule } from './home-page-routing.module';



@NgModule({
  declarations: [
   EshopUserHomePage
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    EshopUsersHomePageRoutingModule,
  ]
})
export class AdminUsersdModule {
}
