import { ILight } from 'node-hue-api';

export enum LightsActionTypes {
    GET = '[Light] Get Lights',
    LOADING = '[Light] Loading Lights',
    LOAD = '[Light] Load Lights'
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

export type LightsActions = GetLightsAction | LoadingLightsAction | LoadLightsAction;
