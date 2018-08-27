import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, map, switchMap } from 'rxjs/operators';
import { NEVER } from 'rxjs/internal/observable/never';
import { of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import { HueState, selectHueLights } from './hue.reducer';
import {
    LightOffAction,
    LightOnAction,
    LightsActionTypes,
    LoadLightsAction,
    StoreLightsAction
} from './lights.actions';
import { LightsData } from './lights.reducer';
import { LightsService } from '../lights.service';
import { LoadGroupsAction } from './groups.actions';

@Injectable()
export class LightsEffects {
    @Effect()
    getLights$ = this.actions$.ofType(LightsActionTypes.GET).pipe(
        switchMap(() => this.store$.select(selectHueLights).pipe(first())),
        switchMap((rooms : LightsData) => {
            if(!rooms.loading && 0 === rooms.ids.length) {
                return of(new LoadLightsAction());
            }
            return NEVER;
        }),
    );
    
    @Effect()
    loadGroups$ = this.actions$.ofType(LightsActionTypes.LOAD).pipe(
        switchMap(() => this.lightsService.getLights()),
        map(lights => new StoreLightsAction({ lights }))
    );
    
    @Effect()
    increaseLoading$ = this.actions$.ofType(LightsActionTypes.LOAD).pipe(
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.ofType(LightsActionTypes.STORE).pipe(
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
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly lightsService : LightsService) {
    }
}
