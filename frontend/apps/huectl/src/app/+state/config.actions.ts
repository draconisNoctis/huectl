import { Action } from '@ngrx/store';
import { ConfigData } from './config.reducer';

export enum ConfigActionTypes {
    UpdateConfig = '[Config] Update Data',
}

export class UpdateConfig implements Action {
    readonly type = ConfigActionTypes.UpdateConfig;
    constructor(public readonly payload: ConfigData) {}
}

export type ConfigActions = UpdateConfig;
