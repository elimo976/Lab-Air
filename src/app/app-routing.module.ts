import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsPreviewComponent } from './components/products-preview/products-preview.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'construction', component: UnderConstructionComponent },
  { path: 'preview', component: ProductsPreviewComponent },
  { path: 'list', component: ProductsListComponent },
  { path: 'list/category/:category', component: ProductsListComponent },
  { path: 'list/new-arrival/:newArrival', component: ProductsListComponent },
  { path: 'list/:bestSellerGte/:bestSellerLte', component: ProductsListComponent },  
  { path: 'product/:id', component: ProductDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
