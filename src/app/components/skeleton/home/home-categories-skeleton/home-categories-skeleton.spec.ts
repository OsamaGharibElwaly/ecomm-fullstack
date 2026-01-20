import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriesSkeleton } from './home-categories-skeleton';

describe('HomeCategoriesSkeleton', () => {
  let component: HomeCategoriesSkeleton;
  let fixture: ComponentFixture<HomeCategoriesSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCategoriesSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCategoriesSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
