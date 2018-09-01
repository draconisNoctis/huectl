import { IScene } from 'node-hue-api';
import { Action } from '@ngrx/store';

export enum ScenesActionTypes {
    LOAD = '[Scene] Loadi Scenes',
    STORE = '[Scene] Store Scenes',
    REFRESH = '[Scene] Refresh Scenes',
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

export type ScenesActions = LoadScenesAction | StoreScenesAction | RefreshScenesAction;
