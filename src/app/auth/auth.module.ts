import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminAuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '../shared/state/users.effects';

import * as fromUsers from '../shared/state/users.reducer';
import { UserSignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserSignUpComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminAuthRoutingModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class AdminAuthdModule {}
