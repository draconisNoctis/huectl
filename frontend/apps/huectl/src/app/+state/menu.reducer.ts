import { MenuActions, MenuActionTypes } from './menu.actions';

export interface MenuData {
    opened: boolean;
}

export interface MenuState {
    readonly menu: MenuData;
}

export const initialState: MenuData = {
    opened: false
};

export function menuReducer(state = initialState, action: MenuActions): MenuData {
    switch (action.type) {
        case MenuActionTypes.Open: {
            return { ...state, opened: true };
        }
        case MenuActionTypes.Close: {
            return { ...state, opened: false };
        }

        default:
            return state;
    }
}
