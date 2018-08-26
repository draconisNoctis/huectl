import { ILightGroup } from 'node-hue-api';
import { Action } from '@ngrx/store';

export enum GroupActionTypes {
    GET = '[Group] Get Groups',
    LOADING = '[Group] Loading Groups',
    LOAD = '[Group] Load Groups',
    ON = '[Group] On',
    OFF = '[Group] Off'
}

export class GetGroupsAction implements Action {
    readonly type = GroupActionTypes.GET;
}

export class LoadingGroupsAction implements Action {
    readonly type = GroupActionTypes.LOADING;
}

export class LoadGroupsAction implements Action {
    readonly type = GroupActionTypes.LOAD;
    
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

export type GroupsActions = GetGroupsAction | LoadingGroupsAction | LoadGroupsAction | GroupOnAction | GroupOffAction;
