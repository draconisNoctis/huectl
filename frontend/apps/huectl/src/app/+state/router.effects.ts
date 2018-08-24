import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Navigate, RouterActionTypes } from './router.actions';

@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RouterActionTypes.Navigate),
        map((action: Navigate) => action.payload),
        tap(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );
    
    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(RouterActionTypes.Back),
        tap(() => this.location.back())
    );
    
    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(RouterActionTypes.Forward),
        tap(() => this.location.forward())
    );
    
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}
}
