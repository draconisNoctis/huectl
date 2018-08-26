import { Action } from '@ngrx/store';
import { ApiData } from './api.reducer';

export enum ApiActionTypes {
    Update = '[Api] Update'
}

export class ApiUpdateAction implements Action {
    readonly type = ApiActionTypes.Update;
    
    constructor(public readonly payload : ApiData) {}
}

export type ApiActions = ApiUpdateAction;
