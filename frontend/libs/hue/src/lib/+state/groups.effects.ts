import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { delay, filter, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, defer, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import {
    GroupActionTypes,
    GroupActivateSceneAction,
    GroupOffAction,
    GroupOnAction,
    GroupSetStateAction,
    LoadGroupsAction,
    RefreshGroupsAction,
    StoreGroupsAction
} from './groups.actions';
import { HueState, selectHueApi } from './hue.reducer';
import { GroupsService } from '../groups.service';
import { LoadLightsAction } from './lights.actions';

@Injectable()
export class GroupsEffects {
    
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
    groupSetState = this.actions$.pipe(
        ofType(GroupActionTypes.SET_STATE),
        switchMap((action : GroupSetStateAction) => {
            const { group, ...state } = action.payload;
            return this.groupsService.state(group, state);
        }),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    @Effect()
    groupActivateScene = this.actions$.pipe(
        ofType(GroupActionTypes.ACTIVATE_SCENE),
        switchMap((action : GroupActivateSceneAction) => {
            return this.groupsService.scene(action.payload.group, action.payload.scene);
        }),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    @Effect()
    init$ = defer(() => {
        return this.store$.pipe(
            select(selectHueApi),
            filter(api => !!(api && api.bridge && api.account)),
            first(),
            switchMap(() => of(new LoadGroupsAction(), new RefreshGroupsAction()))
        )
    });
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly groupsService : GroupsService) {
    }
}
