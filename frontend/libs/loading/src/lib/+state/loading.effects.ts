import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { LoadingData, LoadingState } from './loading.reducer';
import { CloseDialogAction, IncreaseLoadingAction, LoadingActionTypes, OpenDialogAction } from './loading.actions';
import { delay, first, map, switchMap } from 'rxjs/operators';
import { NEVER, of, combineLatest } from 'rxjs';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Injectable()
export class LoadingEffects {
    @Effect()
    increase$ = this.actions$.ofType(LoadingActionTypes.INCREASE).pipe(
        switchMap((action : IncreaseLoadingAction) => combineLatest(of(action), this.store$.select('loading').pipe(first()))),
        switchMap(([ action, state ]) => {
            if(state.count === 1) {
                return of(action)
            }
            return NEVER;
        }),
        delay(1),
        map(action => new OpenDialogAction(this.dialog.open(LoadingDialogComponent, {
            data: action.payload,
            disableClose: true,
            backdropClass: 'none'
        }).id))
    );
    
    @Effect()
    decrease$ = this.actions$.ofType(LoadingActionTypes.DECREASE).pipe(
        delay(1),
        switchMap(() => this.store$.select('loading').pipe(first())),
        switchMap((state : LoadingData) => {
            if(state.count === 0 && state.dialogId) {
                this.dialog.getDialogById(state.dialogId)!.close();
                return of(new CloseDialogAction())
            }
            return NEVER;
        })
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<LoadingState>,
                protected readonly dialog : MatDialog) {}
}
