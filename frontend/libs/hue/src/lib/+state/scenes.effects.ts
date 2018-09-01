import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { delay, filter, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, defer, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import { LoadScenesAction, RefreshScenesAction, ScenesActionTypes, StoreScenesAction, } from './scenes.actions';
import { ScenesService } from '../scenes.service';
import { HueState, selectHueApi } from './hue.reducer';

@Injectable()
export class ScenesEffects {
    @Effect()
    refreshScenes$ = this.actions$.pipe(
        ofType(ScenesActionTypes.REFRESH),
        delay(60000),
        switchMap(() => of(new RefreshScenesAction(), new LoadScenesAction({ silent: true })))
    );
    
    @Effect()
    loadScenes$ = this.actions$.pipe(
        ofType(ScenesActionTypes.LOAD),
        switchMap((action : LoadScenesAction) => combineLatest(of(action), this.scenesService.getScenes())),
        map(([ action, scenes ]) => new StoreScenesAction({ ...action.payload, scenes }))
    );
    
    @Effect()
    increaseLoading$ = this.actions$.pipe(
        ofType(ScenesActionTypes.LOAD),
        filter((action : LoadScenesAction) => !action.payload.silent),
        map(() => new IncreaseLoadingAction())
    );
    
    @Effect()
    decreaseLoading$ = this.actions$.pipe(
        ofType(ScenesActionTypes.STORE),
        filter((action : StoreScenesAction) => !action.payload.silent),
        map(() => new DecreaseLoadingAction())
    );
    
    @Effect()
    init$ = defer(() => {
        return this.store$.pipe(
            select(selectHueApi),
            filter(api => !!(api && api.bridge && api.account)),
            first(),
            switchMap(() => of(new LoadScenesAction(), new RefreshScenesAction()))
        )
    });
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly scenesService : ScenesService) {
    }
}
