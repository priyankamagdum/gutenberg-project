import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutenbercBookListComponent } from './gutenberc-book-list.component';

describe('GutenbercBookListComponent', () => {
  let component: GutenbercBookListComponent;
  let fixture: ComponentFixture<GutenbercBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GutenbercBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GutenbercBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
