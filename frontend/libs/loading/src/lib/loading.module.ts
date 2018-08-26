import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './+state/loading.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoadingEffects } from './+state/loading.effects';

@NgModule({
    imports        : [
        CommonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        StoreModule.forFeature('loading', loadingReducer),
        EffectsModule.forFeature([ LoadingEffects ])
    ],
    declarations   : [ LoadingDialogComponent ],
    entryComponents: [ LoadingDialogComponent ],
    exports: [ LoadingDialogComponent ]
})
export class LoadingModule {
}
