import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
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
        MatToolbarModule
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
        MatToolbarModule
    ]
})
export class MaterialModule {
}
