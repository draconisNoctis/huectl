import { LoadingActions, LoadingActionTypes } from './loading.actions';

export interface LoadingData {
    count: number;
    dialogId? : string;
}

export interface LoadingState {
    loading: LoadingData;
}

export const initialState : LoadingData = {
    count: 0
};

export function loadingReducer(state = initialState, action : LoadingActions) : LoadingData {
    switch(action.type) {
        case LoadingActionTypes.INCREASE:
            return { ...state, count: state.count + 1 };
        case LoadingActionTypes.DECREASE:
            return { ...state, count: Math.max(0, state.count - 1) };
        case LoadingActionTypes.OPEN_DIALOG:
            return { ...state, dialogId: action.payload };
        case LoadingActionTypes.CLOSE_DIALOG:
            return { ...state, dialogId: undefined };
    }
    
    return state;
}
