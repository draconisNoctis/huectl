import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { apiReducer } from './+state/api.reducer';
import { groupsReducer } from './+state/groups.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from './+state/groups.effects';

@NgModule({
    imports: [
        StoreModule.forFeature('hue', {
            api: apiReducer,
            groups: groupsReducer
        }),
        EffectsModule.forFeature([ GroupsEffects ])
    ]
})
export class HueModule {}
