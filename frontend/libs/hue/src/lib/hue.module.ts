import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { apiReducer } from './+state/api.reducer';
import { groupsReducer } from './+state/groups.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from './+state/groups.effects';
import { lightsReducer } from './+state/lights.reducer';
import { LightsEffects } from './+state/lights.effects';
import { StateToColorPipe } from './state-to-color.pipe';
import { ScenesEffects } from './+state/scenes.effects';
import { scenesReducer } from './+state/scenes.reducer';
import { HueControlComponent } from './hue-control/hue-control.component';
import {
    MatExpansionModule,
    MatIconModule, MatListModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTabsModule
} from '@angular/material';
import { UtilsModule } from '@huectl/utils';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports     : [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatTabsModule,
        MatListModule,
        UtilsModule,
        StoreModule.forFeature('hue', {
            api   : apiReducer,
            groups: groupsReducer,
            lights: lightsReducer,
            scenes: scenesReducer
        }),
        EffectsModule.forFeature([ GroupsEffects, LightsEffects, ScenesEffects ])
    ],
    declarations: [ StateToColorPipe, HueControlComponent ],
    exports     : [ StateToColorPipe, HueControlComponent ]
})
export class HueModule {
}
