import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeBox } from './promo-code-box';

describe('PromoCodeBox', () => {
  let component: PromoCodeBox;
  let fixture: ComponentFixture<PromoCodeBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoCodeBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoCodeBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
