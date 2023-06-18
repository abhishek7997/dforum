import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPageComponent } from './thread-page.component';

describe('ThreadPageComponent', () => {
  let component: ThreadPageComponent;
  let fixture: ComponentFixture<ThreadPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadPageComponent]
    });
    fixture = TestBed.createComponent(ThreadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
