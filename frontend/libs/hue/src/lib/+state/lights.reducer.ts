import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ILight } from 'node-hue-api';
import { LightsActions, LightsActionTypes } from './lights.actions';

export interface LightsData extends EntityState<ILight> {
    loading: boolean | null;
}

export const lightAdapter = createEntityAdapter<any>();

const initalState : LightsData = lightAdapter.getInitialState({
    loading: null
});

export function lightsReducer(state = initalState, action : LightsActions) : LightsData {
    switch(action.type) {
        case LightsActionTypes.LOADING: {
            return { ...state, loading: true };
        }
        case LightsActionTypes.LOAD: {
            return lightAdapter.addAll(action.payload.lights, { ...state, loading: false });
        }
    }
    
    return state;
}

const { selectAll } = lightAdapter.getSelectors();

export { selectAll as _selectAllLights };
