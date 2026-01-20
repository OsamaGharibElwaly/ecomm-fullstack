import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtTogetherRow } from './bought-together-row';

describe('BoughtTogetherRow', () => {
  let component: BoughtTogetherRow;
  let fixture: ComponentFixture<BoughtTogetherRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoughtTogetherRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtTogetherRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
