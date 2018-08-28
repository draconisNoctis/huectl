import { IScene } from 'node-hue-api';
import { Action } from '@ngrx/store';

export enum ScenesActionTypes {
    GET = '[Scene] Get Scenes',
    LOAD = '[Scene] Loadi Scenes',
    STORE = '[Scene] Store Scenes',
    REFRESH = '[Scene] Refresh Scenes',
}

export class GetScenesAction implements Action {
    readonly type = ScenesActionTypes.GET;
}

export class LoadScenesAction implements Action {
    readonly type = ScenesActionTypes.LOAD;
    
    constructor(public readonly payload : { silent?: boolean } = {}) {}
}

export class StoreScenesAction implements Action {
    readonly type = ScenesActionTypes.STORE;
    
    constructor(public readonly payload : { silent?: boolean, scenes : IScene[] }) {}
}

export class RefreshScenesAction implements Action {
    readonly type = ScenesActionTypes.REFRESH;
}

export type ScenesActions = GetScenesAction | LoadScenesAction | StoreScenesAction | RefreshScenesAction;
