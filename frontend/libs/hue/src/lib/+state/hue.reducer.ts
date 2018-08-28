import { ApiData } from './api.reducer';
import { _selectAllGroups, GroupsData } from './groups.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILightGroup, ILight } from 'node-hue-api';
import { Dictionary } from '@ngrx/entity';
import { _selectAllLights, LightsData } from './lights.reducer';
import { ScenesData, _selectAllScenes } from './scenes.reducer';

declare module 'node-hue-api' {
    export interface ILightGroup {
        $lights?: ILight[];
        state: {
            any_on: boolean;
            all_on: boolean;
        }
    }
    
    export interface IScene {
        recycle: boolean;
    }
}

export interface HueData {
    api: ApiData;
    groups: GroupsData;
    lights: LightsData;
    scenes: ScenesData;
}

export interface HueState {
    hue: HueData;
}

export const selectHue = createFeatureSelector<HueData>('hue');
export const selectHueApi = (state : HueState) => selectHue(state).api;
export const selectHueGroups = (state : HueState) => selectHue(state).groups;
export const selectHueLights = (state : HueState) => selectHue(state).lights;
export const selectHueScenes = (state : HueState) => selectHue(state).scenes;

export const selectAllGroups = createSelector(selectHueGroups, _selectAllGroups);
export const selectAllLights = createSelector(selectHueLights, _selectAllLights);
export const selectAllScenes = createSelector(selectHueScenes, _selectAllScenes);

export const selectAllGroupsWithLights = createSelector(selectAllGroups, selectAllLights, (groups : ILightGroup[], lights : ILight[]) => {
    return groups.map(group => ({
        ...group,
        $lights: group.lights && group.lights.map(id => lights.find(light => light.id === id))
    }));
});

function grouper(groups : ILightGroup[]) {
    const result : Dictionary<ILightGroup[]> = {};
    
    for(const group of groups) {
        if(!result[group.type]) {
            result[group.type] = [];
        }
        result[group.type].push(group);
    }
    
    return result;
}

export const selectAllGroupsGroupedByType = createSelector(selectAllGroups, grouper);
export const selectAllGroupsWithLightsGroupedByType = createSelector(selectAllGroupsWithLights, grouper);
