import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { delay, filter, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, defer, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import { HueState, selectHueApi } from './hue.reducer';
import { LightsService } from '../lights.service';
import { LoadGroupsAction } from './groups.actions';
import {
    LightOffAction,
    LightOnAction,
    LightsActionTypes,
    LightSetStateAction,
    LoadLightsAction,
    RefreshLightsAction,
    StoreLightsAction
} from './lights.actions';

@Injectable()
export class LightsEffects {
    @Effect()
    refreshLights$ = this.actions$.pipe(
        ofType(LightsActionTypes.REFRESH),
        delay(5000),
        switchMap(() => of(new RefreshLightsAction(), new LoadLightsAction({ silent: true })))
    );
    
    @Effect()
    loadGroups$ = this.actions$.pipe(
        ofType(LightsActionTypes.LOAD),
        switchMap((action : LoadLightsAction) => combineLatest(of(action), this.lightsService.getLights())),
        map(([ action, lights ]) => new StoreLightsAction({ ...action.payload, lights }))
    );
    
    @Effect()
    increaseLoading$ = this.actions$.pipe(
        ofType(LightsActionTypes.LOAD),
        filter((action : LoadLightsAction) => !action.payload.silent),
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.pipe(
        ofType(LightsActionTypes.STORE),
        filter((action : StoreLightsAction) => !action.payload.silent),
        map(() => new DecreaseLoadingAction())
    );
    
    @Effect()
    lightOn$ = this.actions$.pipe(
        ofType(LightsActionTypes.ON),
        switchMap((action : LightOnAction) => this.lightsService.on(action.payload.light)),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    @Effect()
    lightOff$ = this.actions$.pipe(
        ofType(LightsActionTypes.OFF),
        switchMap((action : LightOffAction) => this.lightsService.off(action.payload.light)),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    @Effect()
    lightSetState = this.actions$.pipe(
        ofType(LightsActionTypes.SET_STATE),
        switchMap((action : LightSetStateAction) => {
            const { light, ...state } = action.payload;
            return this.lightsService.state(light, state);
        }),
        switchMap(() => of(new LoadGroupsAction(), new LoadLightsAction()))
    );
    
    
    
    @Effect()
    init$ = defer(() => {
        return this.store$.pipe(
            select(selectHueApi),
            filter(api => !!(api && api.bridge && api.account)),
            first(),
            switchMap(() => of(new LoadLightsAction(), new RefreshLightsAction()))
        )
    });
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly lightsService : LightsService) {
    }
}
