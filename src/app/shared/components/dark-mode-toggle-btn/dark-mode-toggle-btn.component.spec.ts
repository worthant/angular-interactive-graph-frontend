import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeToggleBtnComponent } from './dark-mode-toggle-btn.component';

describe('DarkModeToggleComponent', () => {
    let component: DarkModeToggleBtnComponent;
    let fixture: ComponentFixture<DarkModeToggleBtnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DarkModeToggleBtnComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DarkModeToggleBtnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
