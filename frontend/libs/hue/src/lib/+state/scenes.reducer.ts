import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IScene } from 'node-hue-api';
import { ScenesActions, ScenesActionTypes } from './scenes.actions';

export interface ScenesData extends EntityState<IScene> {
    loading: boolean | null;
}

export const sceneAdapter = createEntityAdapter<IScene>();

const initalState : ScenesData = sceneAdapter.getInitialState({
    loading: null
});

export function scenesReducer(state = initalState, action : ScenesActions) : ScenesData {
    switch(action.type) {
        case ScenesActionTypes.LOAD: {
            return { ...state, loading: true };
        }
        case ScenesActionTypes.STORE: {
            return sceneAdapter.addAll(action.payload.scenes, { ...state, loading: false });
        }
    }
    
    return state;
}

const { selectAll } = sceneAdapter.getSelectors();

export { selectAll as _selectAllScenes };
