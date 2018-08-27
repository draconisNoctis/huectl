import { ILight } from 'node-hue-api';
import { Action } from '@ngrx/store';

export enum LightsActionTypes {
    GET = '[Light] Get Lights',
    LOAD = '[Light] Load Lights',
    STORE = '[Light] Store Lights',
    ON = '[Light] On',
    OFF = '[Light] Off'
}

export class GetLightsAction {
    readonly type = LightsActionTypes.GET;
}

export class LoadLightsAction {
    readonly type = LightsActionTypes.LOAD;
}

export class StoreLightsAction {
    readonly type = LightsActionTypes.STORE;
    
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

export type LightsActions = GetLightsAction | LoadLightsAction | StoreLightsAction | LightOnAction | LightOffAction;
