import { ILightGroup, lightState } from 'node-hue-api';
import { Action } from '@ngrx/store';
import State = lightState.State;

export enum GroupActionTypes {
    LOAD = '[Group] Loadi Groups',
    STORE = '[Group] Store Groups',
    REFRESH = '[Group] Refresh Groups',
    ON = '[Group] On',
    OFF = '[Group] Off',
    SET_STATE = '[Group] Set Group State',
    ACTIVATE_SCENE = '[Group] Activate Scene'
}

export class LoadGroupsAction implements Action {
    readonly type = GroupActionTypes.LOAD;
    
    constructor(public readonly payload : { silent?: boolean } = {}) {}
}

export class StoreGroupsAction implements Action {
    readonly type = GroupActionTypes.STORE;
    
    constructor(public readonly payload : { silent?: boolean, groups : ILightGroup[] }) {}
}

export class RefreshGroupsAction implements Action {
    readonly type = GroupActionTypes.REFRESH;
}

export class GroupOnAction implements Action {
    readonly type = GroupActionTypes.ON;
    
    constructor(public readonly payload : { group : string }) {}
}

export class GroupOffAction implements Action {
    readonly type = GroupActionTypes.OFF;
    
    constructor(public readonly payload : { group : string }) {}
}

export class GroupSetStateAction implements Action {
    readonly type = GroupActionTypes.SET_STATE;
    
    constructor(public readonly payload : { group: string } & { [P in keyof State]?: any }) {}
}

export class GroupActivateSceneAction implements Action {
    readonly type = GroupActionTypes.ACTIVATE_SCENE;
    
    constructor(public readonly payload : { group : string; scene : string }) {}
}

export type GroupsActions = LoadGroupsAction | StoreGroupsAction | RefreshGroupsAction | GroupOnAction | GroupOffAction | GroupSetStateAction | GroupActivateSceneAction;
