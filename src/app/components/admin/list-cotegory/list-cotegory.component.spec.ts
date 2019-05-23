import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCotegoryComponent } from './list-cotegory.component';

describe('ListCotegoryComponent', () => {
  let component: ListCotegoryComponent;
  let fixture: ComponentFixture<ListCotegoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCotegoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCotegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
