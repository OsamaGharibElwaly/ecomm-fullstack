import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorVariants } from './color-variants';

describe('ColorVariants', () => {
  let component: ColorVariants;
  let fixture: ComponentFixture<ColorVariants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorVariants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorVariants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
