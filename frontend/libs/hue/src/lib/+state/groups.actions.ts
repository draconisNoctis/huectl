import { ILightGroup } from 'node-hue-api';
import { Action } from '@ngrx/store';

export enum GroupActionTypes {
    GET = '[Group] Get Groups',
    LOAD = '[Group] Loadi Groups',
    STORE = '[Group] Store Groups',
    ON = '[Group] On',
    OFF = '[Group] Off'
}

export class GetGroupsAction implements Action {
    readonly type = GroupActionTypes.GET;
}

export class LoadGroupsAction implements Action {
    readonly type = GroupActionTypes.LOAD;
}

export class StoreGroupsAction implements Action {
    readonly type = GroupActionTypes.STORE;
    
    constructor(public readonly payload : { groups : ILightGroup[] }) {}
}

export class GroupOnAction implements Action {
    readonly type = GroupActionTypes.ON;
    
    constructor(public readonly payload : { group : string }) {}
}

export class GroupOffAction implements Action {
    readonly type = GroupActionTypes.OFF;
    
    constructor(public readonly payload : { group : string }) {}
}

export type GroupsActions = GetGroupsAction | LoadGroupsAction | StoreGroupsAction | GroupOnAction | GroupOffAction;
