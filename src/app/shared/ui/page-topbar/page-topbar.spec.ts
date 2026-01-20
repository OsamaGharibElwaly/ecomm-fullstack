import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTopbar } from './page-topbar';

describe('PageTopbar', () => {
  let component: PageTopbar;
  let fixture: ComponentFixture<PageTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTopbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTopbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
