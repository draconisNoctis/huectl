import { Action } from '@ngrx/store';
import { IUpnpSearchResultItem } from 'node-hue-api';
import { MatDialogConfig } from '@angular/material/dialog/typings/dialog-config';

export enum SetupActionTypes {
    SearchBridges = '[Setup] Search Bridges',
    CancelSearchBridges = '[Setup] Cancel Search Bridges',
    ResetSearchBridges = '[Setup] Reset Search Bridges',
    BridgesLoaded = '[Setup] Bridges Loaded',
    OpenSetup = '[Setup] Open Setup Dialog',
    Register = '[Setup] Register',
    Registered = '[Setup] Registered'
}


export class SearchBridges implements Action {
    readonly type = SetupActionTypes.SearchBridges;
}

export class CancelSearchBridges implements Action {
    readonly type = SetupActionTypes.CancelSearchBridges;
}

export class ResetSearchBridges implements Action {
    readonly type = SetupActionTypes.ResetSearchBridges;
}

export class BridgesLoaded implements Action {
    readonly type = SetupActionTypes.BridgesLoaded;

    constructor(public readonly payload : IUpnpSearchResultItem[]) {}
}

export class OpenSetupDialog implements Action {
    readonly type = SetupActionTypes.OpenSetup;
    
    constructor(public readonly payload? : MatDialogConfig<any>) {}
}

export class Register implements Action {
    readonly type = SetupActionTypes.Register;
    
    constructor(public readonly payload : string) {}
}

export class Registered implements Action {
    readonly type = SetupActionTypes.Registered;
    
    constructor(public readonly payload : string) {}
}

export type SetupActions =
    | SearchBridges
    | BridgesLoaded
    | CancelSearchBridges
    | ResetSearchBridges
    | OpenSetupDialog
    | Register
    | Registered;
