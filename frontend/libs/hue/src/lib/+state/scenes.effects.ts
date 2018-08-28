import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { delay, filter, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, defer, NEVER, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';
import { LoadScenesAction, RefreshScenesAction, ScenesActionTypes, StoreScenesAction, } from './scenes.actions';
import { ScenesData } from './scenes.reducer';
import { ScenesService } from '../scenes.service';
import { HueState, selectHueScenes } from './hue.reducer';

@Injectable()
export class ScenesEffects {
    @Effect()
    getScenes$ = this.actions$.pipe(
        ofType(ScenesActionTypes.GET),
        switchMap(() => this.store$.pipe(select(selectHueScenes), first())),
        switchMap((rooms : ScenesData) => {
            if(!rooms.loading && 0 === rooms.ids.length) {
                return of(new LoadScenesAction());
            }
            return NEVER;
        }),
    );
    
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
        return of(new RefreshScenesAction());
    });
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<HueState>,
                protected readonly scenesService : ScenesService) {
    }
}
