import { Action } from '@ngrx/store';

export enum MenuActionTypes {
    Open = '[Menu] Open',
    Close = '[Menu] Close'
}

export class MenuOpenAction implements Action {
    readonly type = MenuActionTypes.Open;
}

export class MenuCloseAction implements Action {
    readonly type = MenuActionTypes.Close;
}

export type MenuActions = MenuOpenAction | MenuCloseAction;
