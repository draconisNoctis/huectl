import { ConfigActions, ConfigActionTypes } from './config.actions';

/**
 * Interface for the 'Config' data used in
 *  - ConfigState, and
 *  - configReducer
 */
export interface ConfigData {
    bridge?: string;
    account?: string;
    room?: string;
}

/**
 * Interface to the part of the Store containing ConfigState
 * and other information related to ConfigData.
 */
export interface ConfigState {
    readonly config: ConfigData;
}

declare module './app.state' {
    export interface AppState extends ConfigState {
    
    }
}


export const initialState: ConfigData = {};

export function configReducer(
    state = initialState,
    action: ConfigActions
): ConfigData {
    switch (action.type) {

        case ConfigActionTypes.UpdateConfig: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}
