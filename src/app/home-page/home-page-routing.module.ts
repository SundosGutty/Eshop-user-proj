import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EshopUserHomePage } from './home-page.component';



const routes: Routes = [
  {
    path: '',
    component: EshopUserHomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EshopUsersHomePageRoutingModule {}
