import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ILightGroup } from 'node-hue-api';
import { GroupActionTypes, GroupsActions } from './groups.actions';

export interface GroupsData extends EntityState<ILightGroup> {
    loading: boolean | null;
}

export const groupAdapter = createEntityAdapter<ILightGroup>();

const initalState : GroupsData = groupAdapter.getInitialState({
    loading: null
});

export function groupsReducer(state = initalState, action : GroupsActions) : GroupsData {
    switch(action.type) {
        case GroupActionTypes.LOAD: {
            return { ...state, loading: true };
        }
        case GroupActionTypes.STORE: {
            return groupAdapter.addAll(action.payload.groups, { ...state, loading: false });
        }
    }
    
    return state;
}

const { selectAll } = groupAdapter.getSelectors();

export { selectAll as _selectAllGroups };
