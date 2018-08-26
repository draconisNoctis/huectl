import { ApiActions, ApiActionTypes } from './api.actions';

export interface ApiData {
    bridge?: string;
    account?: string;
}

export interface ApiState {
    api: ApiData;
}

export const initialState : ApiData = {};

export function apiReducer(state = initialState, action : ApiActions) {
    switch(action.type) {
        case ApiActionTypes.Update:
            return { ...state, ...action.payload };
    }
    
    return state;
}
