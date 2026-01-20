import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdInfo } from './pd-info';

describe('PdInfo', () => {
  let component: PdInfo;
  let fixture: ComponentFixture<PdInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
