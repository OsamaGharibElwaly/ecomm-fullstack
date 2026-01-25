import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageTopbarComponent } from '../../shared/ui/page-topbar/page-topbar';
import { PdHeroComponent } from './pd-hero/pd-hero';
import { PdInfoComponent } from './pd-info/pd-info';
import { ColorVariantsComponent } from '../../shared/ui/color-variants/color-variants';
import { QtyStepperComponent } from '../../shared/ui/qty-stepper/qty-stepper';
import { TabsComponent } from '../../shared/ui/tabs/tabs';
import { RecommendationRowComponent } from './pd-recommendations/pd-recommendations';
import { StickyAddToCartComponent } from '../../shared/ui/sticky-add-to-cart/sticky-add-to-cart';

import { ProductDetailsQtyStepperSkeleton } from '../../components/skeleton/product-details/product-details-qty-stepper-skeleton/product-details-qty-stepper-skeleton';
import { ProductDetailsTabsSkeleton } from '../../components/skeleton/product-details/product-details-tabs-skeleton/product-details-tabs-skeleton';
import { ProductDetailsRecommendationsSkeleton } from '../../components/skeleton/product-details/product-details-recommendations-skeleton/product-details-recommendations-skeleton';
import { ProductDetailsStickyCartSkeleton } from '../../components/skeleton/product-details/product-details-sticky-cart-skeleton/product-details-sticky-cart-skeleton';

import { ProductDetailsFacade } from './product-details.facade';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageTopbarComponent,
    PdHeroComponent,
    PdInfoComponent,
    ColorVariantsComponent,
    QtyStepperComponent,
    TabsComponent,
    RecommendationRowComponent,
    StickyAddToCartComponent,
    ProductDetailsQtyStepperSkeleton,
    ProductDetailsTabsSkeleton,
    ProductDetailsRecommendationsSkeleton,
    ProductDetailsStickyCartSkeleton,
  ],
  templateUrl: './product-details.html',
  providers: [ProductDetailsFacade],
})
export class ProductDetailsPage {
  readonly f = inject(ProductDetailsFacade);
}
