import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../shared/models/category";
import { Product } from "../shared/models/product";
import { CategoriesService } from "../shared/services/categories.service";
import { ProductsService } from "../shared/services/products.service";

@Component({
    selector: '',
    templateUrl: './products-list.component.html'
})
export class ProductsListUserComponent{
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage: boolean;
  
    constructor(
      private prodService: ProductsService,
      private catService: CategoriesService,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        params['categoryId'] ? this._getProducts([params['categoryId']]) : this._getProducts();
        params['categoryId'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
      });
      this._getCategories();
    }
  
    private _getProducts(categoriesFilter?: string[]) {
      this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
        this.products = resProducts;
      });
    }
  
    private _getCategories() {
      this.catService.getCategories().subscribe((resCats) => {
        this.categories = resCats;
      });
    }
  
    categoryFilter() {
      const selectedCategories = this.categories
        .filter((category) => category.checked)
        .map((category) => category.id);
  
      this._getProducts(selectedCategories);
    }
}