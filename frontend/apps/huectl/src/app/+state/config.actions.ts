import { Action } from '@ngrx/store';
import { ConfigData } from './config.reducer';
import { MatDialogConfig } from '@angular/material';

export enum ConfigActionTypes {
    UpdateConfig = '[Config] Update Data',
    OpenConfig = '[Config] Open'
}

export class UpdateConfig implements Action {
    readonly type = ConfigActionTypes.UpdateConfig;
    constructor(public readonly payload: ConfigData) {}
}


export class OpenConfigDialog implements Action {
    readonly type = ConfigActionTypes.OpenConfig;
    
    constructor(public readonly payload? : MatDialogConfig<any>) {}
}

export type ConfigActions = UpdateConfig | OpenConfigDialog;
