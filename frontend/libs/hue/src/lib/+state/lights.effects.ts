import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, map, switchMap } from 'rxjs/operators';
import { NEVER } from 'rxjs/internal/observable/never';
import { merge, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import { HueState, selectHueLights } from './hue.reducer';
import { LightsActionTypes, LoadingLightsAction, LoadLightsAction } from './lights.actions';
import { LightsData } from './lights.reducer';
import { LightsService } from '../lights.service';

@Injectable()
export class LightsEffects {
    @Effect()
    getLights$ = this.actions$.ofType(LightsActionTypes.GET).pipe(
        switchMap(() => this.store$.select(selectHueLights).pipe(first())),
        switchMap((rooms : LightsData) => {
            if(!rooms.loading && 0 === rooms.ids.length) {
                return merge(
                    of(new LoadingLightsAction()),
                    this.lightsService.getLights().pipe(
                        map(lights => new LoadLightsAction({ lights }))
                    )
                );
            }
            return NEVER;
        }),
    );
    
    @Effect()
    increaseLoading$ = this.actions$.ofType(LightsActionTypes.LOADING).pipe(
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.ofType(LightsActionTypes.LOAD).pipe(
        map(() => new DecreaseLoadingAction())
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly lightsService : LightsService) {
    }
}
