import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentationComponent } from './admin-documentation.component';

describe('AdminDocumentationComponent', () => {
  let component: AdminDocumentationComponent;
  let fixture: ComponentFixture<AdminDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDocumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
