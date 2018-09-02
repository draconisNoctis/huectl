import { ApiActions, ApiActionTypes } from './api.actions';

export interface ApiData {
    bridge?: string;
    account?: string;
}

export const initialState : ApiData = {};

export function apiReducer(state = initialState, action : ApiActions) : ApiData {
    switch(action.type) {
        case ApiActionTypes.Update:
            return { ...state, ...action.payload };
    }
    
    return state;
}
