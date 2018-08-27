import { ILight } from 'node-hue-api';
import { Action } from '@ngrx/store';

export enum LightsActionTypes {
    GET = '[Light] Get Lights',
    LOADING = '[Light] Loading Lights',
    LOAD = '[Light] Load Lights',
    ON = '[Light] On',
    OFF = '[Light] Off'
}

export class GetLightsAction {
    readonly type = LightsActionTypes.GET;
}

export class LoadingLightsAction {
    readonly type = LightsActionTypes.LOADING;
}

export class LoadLightsAction {
    readonly type = LightsActionTypes.LOAD;
    
    constructor(public readonly payload : { lights : ILight[] }) {}
}


export class LightOnAction implements Action {
    readonly type = LightsActionTypes.ON;
    
    constructor(public readonly payload : { light : string }) {}
}

export class LightOffAction implements Action {
    readonly type = LightsActionTypes.OFF;
    
    constructor(public readonly payload : { light : string }) {}
}

export type LightsActions = GetLightsAction | LoadingLightsAction | LoadLightsAction | LightOnAction | LightOffAction;
