import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatDialogModule,
    MatDividerModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatSlideToggleModule,
    MatStepperModule, MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatStepperModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatGridListModule,
        MatCardModule,
        MatSlideToggleModule
    ],
    exports: [
        FlexLayoutModule,
        MatIconModule,
        MatStepperModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatGridListModule,
        MatCardModule,
        MatSlideToggleModule
    ]
})
export class MaterialModule {
}
