import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiUpdateAction, BridgeService } from '@huectl/api';
import { BridgesLoaded, OpenSetupDialog, Register, Registered, SetupActionTypes } from './setup.actions';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SetupDialogComponent } from '../setup-dialog/setup-dialog.component';
import { NEVER, of } from 'rxjs';

@Injectable()
export class SetupEffects {
    @Effect()
    searchBridges$ = this.actions$.ofType(SetupActionTypes.SearchBridges).pipe(
        switchMap(() => this.bridgeService.search()),
        map(result => new BridgesLoaded(result))
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
        switchMap((action : Register) => this.bridgeService.register(action.payload)),
        switchMap(account => of(
            new Registered(account),
            new ApiUpdateAction({ account })
        ))
    );

    constructor(protected readonly actions$: Actions,
                protected readonly bridgeService : BridgeService,
                protected readonly dialog : MatDialog) {}
}
