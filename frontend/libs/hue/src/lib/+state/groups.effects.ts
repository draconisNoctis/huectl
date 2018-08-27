import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { NEVER, of, defer, combineLatest } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import {
    GroupActionTypes,
    GroupOffAction,
    GroupOnAction,
    LoadGroupsAction, RefreshGroupsAction,
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
    refreshGroups$ = this.actions$.pipe(
        ofType(GroupActionTypes.REFRESH),
        delay(5000),
        switchMap(() => of(new RefreshGroupsAction(), new LoadGroupsAction({ silent: true })))
    );
    
    @Effect()
    loadGroups$ = this.actions$.pipe(
        ofType(GroupActionTypes.LOAD),
        switchMap((action : LoadGroupsAction) => combineLatest(of(action), this.groupsService.getGroups())),
        map(([ action, groups ]) => new StoreGroupsAction({ ...action.payload, groups }))
    );
    
    @Effect()
    increaseLoading$ = this.actions$.pipe(
        ofType(GroupActionTypes.LOAD),
        filter((action : LoadGroupsAction) => !action.payload.silent),
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.pipe(
        ofType(GroupActionTypes.STORE),
        filter((action : StoreGroupsAction) => !action.payload.silent),
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
    
    @Effect()
    init$ = defer(() => {
        return of(new RefreshGroupsAction());
    });
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly groupsService : GroupsService) {
    }
}
