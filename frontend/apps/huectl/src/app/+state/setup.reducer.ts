import { SetupActions, SetupActionTypes } from './setup.actions';
import { IUpnpSearchResultItem } from 'node-hue-api';

export interface SetupData {
    searching?: boolean;
    bridges?: IUpnpSearchResultItem[];
    registering?: boolean;
}

export interface SetupState {
    readonly setup: SetupData;
}

export const initialState: SetupData = {
};

export function setupReducer(
    state = initialState,
    action: SetupActions
): SetupData {
    switch (action.type) {
        case SetupActionTypes.BridgesLoaded:
            if(!state.searching) return state;
            return { ...state, bridges: action.payload, searching: false };
        
        case SetupActionTypes.SearchBridges:
            return { ...state, searching: true };
            
        case SetupActionTypes.CancelSearchBridges:
            return { ...state, searching: false };
            
        case SetupActionTypes.ResetSearchBridges:
            return { ...state, bridges: undefined };
        
        case SetupActionTypes.Register:
            return { ...state, registering: true };
        
        case SetupActionTypes.Registered:
            return { ...state, registering: false };
        
        default:
            return state;
    }
}
