import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadCreateComponent } from './thread-create.component';

describe('ThreadCreateComponent', () => {
  let component: ThreadCreateComponent;
  let fixture: ComponentFixture<ThreadCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadCreateComponent]
    });
    fixture = TestBed.createComponent(ThreadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
