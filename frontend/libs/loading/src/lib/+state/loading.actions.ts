import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
    INCREASE = '[Loading] Increase',
    DECREASE = '[Loading] Decrease',
    OPEN_DIALOG = '[Loading] Open Dialog',
    CLOSE_DIALOG = '[Loading] Close Dialog'
}

export class IncreaseLoadingAction implements Action {
    readonly type = LoadingActionTypes.INCREASE
}

export class DecreaseLoadingAction implements Action {
    readonly type = LoadingActionTypes.DECREASE;
}

export class OpenDialogAction implements Action {
    readonly type = LoadingActionTypes.OPEN_DIALOG;
    
    constructor(public readonly payload : string) {}
}

export class CloseDialogAction implements Action {
    readonly type = LoadingActionTypes.CLOSE_DIALOG;
}

export type LoadingActions = IncreaseLoadingAction
    | DecreaseLoadingAction
    | OpenDialogAction
    | CloseDialogAction;
