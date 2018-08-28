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

@NgModule({
    imports     : [
        StoreModule.forFeature('hue', {
            api   : apiReducer,
            groups: groupsReducer,
            lights: lightsReducer,
            scenes: scenesReducer
        }),
        EffectsModule.forFeature([ GroupsEffects, LightsEffects, ScenesEffects ])
    ],
    declarations: [ StateToColorPipe ],
    exports     : [ StateToColorPipe ]
})
export class HueModule {
}
