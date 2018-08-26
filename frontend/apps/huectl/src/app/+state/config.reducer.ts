import { ConfigActions, ConfigActionTypes } from './config.actions';

export interface ConfigData {
    room?: string;
}

export interface ConfigState {
    readonly config: ConfigData;
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
