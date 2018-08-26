import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiUpdateAction, BridgeService } from '@huectl/hue';
import { BridgesLoaded, OpenSetupDialog, Register, SetupActionTypes } from './setup.actions';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SetupDialogComponent } from '../setup-dialog/setup-dialog.component';
import { concat, NEVER, of } from 'rxjs';
import { DecreaseLoadingAction, IncreaseLoadingAction } from '@huectl/loading';

@Injectable()
export class SetupEffects {
    @Effect()
    searchBridges$ = this.actions$.ofType(SetupActionTypes.SearchBridges).pipe(
        switchMap(() => concat(
            of(new IncreaseLoadingAction()),
            this.bridgeService.search().pipe(
                switchMap(result => of(new DecreaseLoadingAction(), new BridgesLoaded(result)))
            )
        ))
    );
    
    @Effect()
    openSetupDialog$ = this.actions$.ofType(SetupActionTypes.OpenSetup).pipe(
        switchMap((action : OpenSetupDialog) => {
            const dialog = this.dialog.open(SetupDialogComponent, action.payload);
            
            return dialog.afterClosed();
        }),
        switchMap(result => {
            return result ? of(new ApiUpdateAction(result)) : NEVER;
        })
    );
    
    @Effect()
    register$ = this.actions$.ofType(SetupActionTypes.Register).pipe(
        switchMap((action : Register) => concat(
            of(new IncreaseLoadingAction()),
            this.bridgeService.register(action.payload).pipe(
                switchMap(account => of(
                    new DecreaseLoadingAction(),
                    new ApiUpdateAction({ account })
                ))
            )
        ))
    );

    constructor(protected readonly actions$: Actions,
                protected readonly bridgeService : BridgeService,
                protected readonly dialog : MatDialog) {}
}
