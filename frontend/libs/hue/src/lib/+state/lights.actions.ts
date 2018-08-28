import { ILight, lightState } from 'node-hue-api';
import { Action } from '@ngrx/store';
import State = lightState.State;

export enum LightsActionTypes {
    GET = '[Light] Get Lights',
    LOAD = '[Light] Load Lights',
    STORE = '[Light] Store Lights',
    REFRESH = '[Light] Refresh Lights',
    ON = '[Light] On',
    OFF = '[Light] Off',
    SET_STATE = '[Light] Set Light State'
}

export class GetLightsAction {
    readonly type = LightsActionTypes.GET;
}

export class LoadLightsAction {
    readonly type = LightsActionTypes.LOAD;
    
    constructor(public readonly payload : { silent?: boolean } = {}) {}
}

export class StoreLightsAction {
    readonly type = LightsActionTypes.STORE;
    
    constructor(public readonly payload : { silent?: boolean, lights : ILight[] }) {}
}

export class RefreshLightsAction {
    readonly type = LightsActionTypes.REFRESH;
}

export class LightOnAction implements Action {
    readonly type = LightsActionTypes.ON;
    
    constructor(public readonly payload : { light : string }) {}
}

export class LightOffAction implements Action {
    readonly type = LightsActionTypes.OFF;
    
    constructor(public readonly payload : { light : string }) {}
}

export class LightSetStateAction implements Action {
    readonly type = LightsActionTypes.SET_STATE;
    
    constructor(public readonly payload : { light: string } & { [P in keyof State]?: any }) {}
}

export type LightsActions = GetLightsAction
    | LoadLightsAction
    | StoreLightsAction
    | RefreshLightsAction
    | LightOnAction
    | LightOffAction
    | LightSetStateAction;
