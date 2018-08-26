import { SetupActions, SetupActionTypes } from './setup.actions';
import { IUpnpSearchResultItem } from 'node-hue-api';

export interface SetupData {
    bridges?: IUpnpSearchResultItem[];
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
            return { ...state, bridges: action.payload };
            
        case SetupActionTypes.ResetSearchBridges:
            return { ...state, bridges: undefined };
            
        default:
            return state;
    }
}
