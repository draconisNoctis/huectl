import { ILightGroup } from 'node-hue-api';

export enum GroupActionTypes {
    GET = '[Group] Get Groups',
    LOADING = '[Group] Loading Groups',
    LOAD = '[Group] Load Groups'
}

export class GetGroupsAction {
    readonly type = GroupActionTypes.GET;
}

export class LoadingGroupsAction {
    readonly type = GroupActionTypes.LOADING;
}

export class LoadGroupsAction {
    readonly type = GroupActionTypes.LOAD;
    
    constructor(public readonly payload : { groups : ILightGroup[] }) {}
}

export type GroupsActions = GetGroupsAction | LoadingGroupsAction | LoadGroupsAction;
