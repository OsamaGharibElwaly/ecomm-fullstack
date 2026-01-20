import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHero } from './pd-hero';

describe('PdHero', () => {
  let component: PdHero;
  let fixture: ComponentFixture<PdHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
