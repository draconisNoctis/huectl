import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { merge, of, NEVER } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import {
    GroupActionTypes,
    GroupOffAction,
    GroupOnAction,
    LoadGroupsAction,
    LoadingGroupsAction,
} from './groups.actions';
import { GroupsData } from './groups.reducer';
import { HueState, selectHueGroups } from './hue.reducer';
import { GroupsService } from '../groups.service';

@Injectable()
export class GroupsEffects {
    @Effect()
    getGroups$ = this.actions$.ofType(GroupActionTypes.GET).pipe(
        switchMap(() => this.store$.select(selectHueGroups).pipe(first())),
        switchMap((rooms : GroupsData) => {
            if(!rooms.loading && 0 === rooms.ids.length) {
                return merge(
                    of(new LoadingGroupsAction()),
                    this.groupsService.getGroups().pipe(
                        map(groups => new LoadGroupsAction({ groups }))
                    )
                );
            }
            return NEVER;
        }),
    );
    
    @Effect()
    increaseLoading$ = this.actions$.ofType(GroupActionTypes.LOADING).pipe(
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.ofType(GroupActionTypes.LOAD).pipe(
        map(() => new DecreaseLoadingAction())
    );
    
    @Effect()
    groupOn$ = this.actions$.pipe(
        ofType(GroupActionTypes.ON),
        switchMap((action : GroupOnAction) => this.groupsService.on(action.payload.group)),
        filter(() => false)
    );
    
    @Effect()
    groupOff$ = this.actions$.pipe(
        ofType(GroupActionTypes.OFF),
        switchMap((action : GroupOffAction) => this.groupsService.off(action.payload.group)),
        filter(() => false)
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly groupsService : GroupsService) {
    }
}
