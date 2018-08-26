import { ApiData } from './api.reducer';
import { _selectAllGroups, GroupsData } from './groups.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILightGroup } from 'node-hue-api';
import { Dictionary } from '@ngrx/entity';

export interface HueData {
    api: ApiData;
    groups: GroupsData;
}

export interface HueState {
    hue: HueData;
}

export const selectHue = createFeatureSelector<HueData>('hue');
export const selectHueApi = (state : HueState) => selectHue(state).api;
export const selectHueGroups = (state : HueState) => selectHue(state).groups;

export const selectAllGroups = createSelector(selectHueGroups, _selectAllGroups);

export const selectAllGroupsGroupedByType = createSelector(selectAllGroups, (groups : ILightGroup[]) => {
    const result : Dictionary<ILightGroup[]> = {};
    
    for(const group of groups) {
        if(!result[group.type]) {
            result[group.type] = [];
        }
        result[group.type].push(group);
    }
    
    return result;
})
