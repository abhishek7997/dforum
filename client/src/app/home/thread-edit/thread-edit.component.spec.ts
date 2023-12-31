import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadEditComponent } from './thread-edit.component';

describe('ThreadEditComponent', () => {
  let component: ThreadEditComponent;
  let fixture: ComponentFixture<ThreadEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadEditComponent]
    });
    fixture = TestBed.createComponent(ThreadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
