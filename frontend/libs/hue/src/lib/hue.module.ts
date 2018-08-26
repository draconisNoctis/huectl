import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { apiReducer } from './+state/api.reducer';
import { groupsReducer } from './+state/groups.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from './+state/groups.effects';
import { lightsReducer } from './+state/lights.reducer';
import { LightsEffects } from './+state/lights.effects';
import { StateToColorPipe } from './state-to-color.pipe';

@NgModule({
    imports     : [
        StoreModule.forFeature('hue', {
            api   : apiReducer,
            groups: groupsReducer,
            lights: lightsReducer
        }),
        EffectsModule.forFeature([ GroupsEffects, LightsEffects ])
    ],
    declarations: [ StateToColorPipe ],
    exports     : [ StateToColorPipe ]
})
export class HueModule {
}
