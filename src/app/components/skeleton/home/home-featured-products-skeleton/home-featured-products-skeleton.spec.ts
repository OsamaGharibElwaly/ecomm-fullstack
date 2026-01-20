import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedProductsSkeleton } from './home-featured-products-skeleton';

describe('HomeFeaturedProductsSkeleton', () => {
  let component: HomeFeaturedProductsSkeleton;
  let fixture: ComponentFixture<HomeFeaturedProductsSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedProductsSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFeaturedProductsSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
