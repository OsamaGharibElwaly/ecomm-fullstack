import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdTabs } from './pd-tabs';

describe('PdTabs', () => {
  let component: PdTabs;
  let fixture: ComponentFixture<PdTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
