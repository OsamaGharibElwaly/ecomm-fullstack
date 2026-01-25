import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppHeaderComponent } from '../../shared/ui/app-header/app-header';
import { BottomNavComponent } from '../../shared/ui/bottom-nav/bottom-nav';
import { SearchBarComponent } from '../../shared/ui/search-bar/search-bar';
import { HeroBannerComponent } from '../../shared/ui/hero-banner/hero-banner';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { CategoryChipsComponent } from '../../shared/ui/category-chips/category-chips';
import { ProductCard } from '../../shared/ui/product-card/product-card';

import { HomeHeroSkeleton } from '../../components/skeleton/home/home-hero-skeleton/home-hero-skeleton';
import { HomeCategoriesSkeleton } from '../../components/skeleton/home/home-categories-skeleton/home-categories-skeleton';
import { HomeFeaturedProductsSkeleton } from '../../components/skeleton/home/home-featured-products-skeleton/home-featured-products-skeleton';

import { HomeFacade } from './home.facade';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    ReactiveFormsModule,
    AppHeaderComponent,
    BottomNavComponent,
    SearchBarComponent,
    HeroBannerComponent,
    SectionHeaderComponent,
    CategoryChipsComponent,
    ProductCard,
    HomeHeroSkeleton,
    HomeCategoriesSkeleton,
    HomeFeaturedProductsSkeleton,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  providers: [HomeFacade],
})
export class HomePage {
  readonly f = inject(HomeFacade);

  ngOnInit(): void {
    this.f.init();
  }
}
