import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AdminToastMessageComponent } from './components/user-toats/toast-message.component';
import { AdminConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AdminFormBaseTemplateComponent } from './components/form-template/form-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryNamePipe } from './pipes/country-name.pipe';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

@NgModule({
  declarations: [
    GalleryComponent,
    AdminToastMessageComponent,
    AdminConfirmDialogComponent,
    AdminFormBaseTemplateComponent, 
    CountryNamePipe, 
    BannerComponent, 
    FooterComponent, 
    GalleryComponent, 
    HeaderComponent,
    NavComponent,
    CartIconComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductPageComponent,

    
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [CommonModule, 
    RouterModule, 
    GalleryComponent, 
    AdminToastMessageComponent, 
    AdminConfirmDialogComponent, 
    AdminFormBaseTemplateComponent, 
    CountryNamePipe, 
    BannerComponent, 
    FooterComponent, 
    GalleryComponent,
    HeaderComponent,
    NavComponent,
    CartIconComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductPageComponent,
  ],
})
export class SharedModule {}
