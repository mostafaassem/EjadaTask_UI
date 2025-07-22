import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCompnent } from './header-compnent';

describe('HeaderCompnent', () => {
  let component: HeaderCompnent;
  let fixture: ComponentFixture<HeaderCompnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCompnent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCompnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
