import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { NgbAccordionModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './components/slider/slider.component';
import { HistoryComponent } from './components/history/history.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { ProductsPreviewComponent } from './components/products-preview/products-preview.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { SpaceAfterCommaPipe } from './Pipes/space-after-comma.pipe';
import { LocalCurrencyPipe } from './Pipes/local-currency.pipe';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FilterByNamePipe } from './Pipes/filter-by-name.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ColorLabelComponent } from './components/color-label/color-label.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UnderConstructionComponent,
    FooterComponent,
    HeroBannerComponent,
    SliderComponent,
    HistoryComponent,
    NavbarComponent,
    ProductDetailComponent,
    ProductsListComponent,
    BestSellersComponent,
    ProductsPreviewComponent,
    SizesComponent,
    SpaceAfterCommaPipe,
    LocalCurrencyPipe,
    CartModalComponent,
    FiltersComponent,
    FilterByNamePipe,
    SpinnerComponent,
    ColorLabelComponent,
    CartComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgbAccordionModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
