import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { RoomsActions, RoomActionTypes } from './rooms.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RoomsData extends EntityState<any> {
    selectedRoomId: string | null;
    loading: boolean | null;
}

export interface RoomsState {
    rooms: RoomsData;
}

export const roomAdapter = createEntityAdapter<any>();

export const initalState : RoomsData = roomAdapter.getInitialState({
    selectedRoomId: null,
    loading: null
});

export function roomsReducer(state = initalState, action : RoomsActions) : RoomsData {
    switch(action.type) {
        case RoomActionTypes.LOADING_ROOMS: {
            return { ...state, loading: true };
        }
        case RoomActionTypes.LOAD_ROOMS: {
            return roomAdapter.addAll(action.payload.rooms, { ...state, loading: false });
        }
    }
    
    return state;
}

const { selectAll } = roomAdapter.getSelectors();

export const selectRooms = createFeatureSelector('rooms');

export const selectAllRooms = createSelector(selectRooms, selectAll);
