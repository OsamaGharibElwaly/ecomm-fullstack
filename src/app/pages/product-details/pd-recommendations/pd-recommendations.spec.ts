import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdRecommendations } from './pd-recommendations';

describe('PdRecommendations', () => {
  let component: PdRecommendations;
  let fixture: ComponentFixture<PdRecommendations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdRecommendations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdRecommendations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
