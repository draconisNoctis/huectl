import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule
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
        MatSlideToggleModule,
        MatTabsModule,
        MatSliderModule,
        MatExpansionModule
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
        MatSlideToggleModule,
        MatTabsModule,
        MatSliderModule,
        MatExpansionModule
    ]
})
export class MaterialModule {
}
