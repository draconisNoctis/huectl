import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initialState as setupInitialState, setupReducer } from './+state/setup.reducer';
import { SetupEffects } from './+state/setup.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { SetupDialogComponent } from './setup-dialog/setup-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        StoreModule.forFeature('setup', setupReducer, {
            initialState: setupInitialState
        }),
        EffectsModule.forFeature([SetupEffects]),
        MatDialogModule
    ],
    declarations: [SetupDialogComponent],
    entryComponents: [ SetupDialogComponent ]
})
export class SetupModule {}
