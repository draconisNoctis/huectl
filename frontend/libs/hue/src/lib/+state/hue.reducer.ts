import { ApiData } from './api.reducer';
import { _selectAllGroups, GroupsData } from './groups.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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

// export const selectApi = createFeatureSelector<HueData>('api');
// export const selectGroups = createFeatureSelector<HueData>('groups');

// export const selectHueApi = createSelector(selectHue, selectApi);
// export const selectHueGroups = createSelector(selectHue, selectGroups);

export const selectAllGroups = createSelector(selectHueGroups, _selectAllGroups);
