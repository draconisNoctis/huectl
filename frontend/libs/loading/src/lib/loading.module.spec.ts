import { async, TestBed } from '@angular/core/testing';
import { LoadingModule } from './loading.module';

describe('LoadingModule', () => {
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [LoadingModule]
            }).compileComponents();
        })
    );

    it('should create', () => {
        expect(LoadingModule).toBeDefined();
    });
});
