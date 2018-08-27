import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, map, switchMap } from 'rxjs/operators';
import { NEVER, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import {
    GroupActionTypes,
    GroupOffAction,
    GroupOnAction,
    LoadGroupsAction,
    StoreGroupsAction,
} from './groups.actions';
import { GroupsData } from './groups.reducer';
import { HueState, selectHueGroups } from './hue.reducer';
import { GroupsService } from '../groups.service';
import { LoadLightsAction } from './lights.actions';

@Injectable()
export class GroupsEffects {
    @Effect()
    getGroups$ = this.actions$.ofType(GroupActionTypes.GET).pipe(
        switchMap(() => this.store$.select(selectHueGroups).pipe(first())),
        switchMap((rooms : GroupsData) => {
            if(!rooms.loading && 0 === rooms.ids.length) {
                return of(new LoadGroupsAction());
            }
            return NEVER;
        }),
    );
    
    @Effect()
    loadGroups$ = this.actions$.ofType(GroupActionTypes.LOAD).pipe(
        switchMap(() => this.groupsService.getGroups()),
        map(groups => new StoreGroupsAction({ groups }))
    );
    
    @Effect()
    increaseLoading$ = this.actions$.ofType(GroupActionTypes.LOAD).pipe(
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.ofType(GroupActionTypes.STORE).pipe(
        map(() => new DecreaseLoadingAction())
    );
    
    @Effect()
    groupOn$ = this.actions$.pipe(
        ofType(GroupActionTypes.ON),
        switchMap((action : GroupOnAction) => this.groupsService.on(action.payload.group)),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    @Effect()
    groupOff$ = this.actions$.pipe(
        ofType(GroupActionTypes.OFF),
        switchMap((action : GroupOffAction) => this.groupsService.off(action.payload.group)),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly groupsService : GroupsService) {
    }
}
