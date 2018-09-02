import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
    Navigate = '[Router] Navigate',
    Forward = '[Router] Forward',
    Back = '[Router] Back'
}

export class Navigate implements Action {
    readonly type = RouterActionTypes.Navigate;
    constructor(public readonly payload: {
        path: any[];
        query?: object;
        extras?: NavigationExtras;
    }) {}
}

export class Forward implements Action {
    readonly type = RouterActionTypes.Forward;
}

export class Back implements Action {
    readonly type = RouterActionTypes.Back;
}

export type RouterActions = Navigate | Forward | Back;
