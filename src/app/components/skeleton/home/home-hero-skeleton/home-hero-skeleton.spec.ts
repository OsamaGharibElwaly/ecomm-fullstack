import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroSkeleton } from './home-hero-skeleton';

describe('HomeHeroSkeleton', () => {
  let component: HomeHeroSkeleton;
  let fixture: ComponentFixture<HomeHeroSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeroSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
