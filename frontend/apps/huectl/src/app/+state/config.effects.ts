import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { first, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { combineLatest, NEVER, of } from 'rxjs';
import { OpenSetupDialog } from './setup.actions';
import { ApiData } from '@huectl/hue';
import { AppState } from './app.state';
import { ConfigActionTypes, OpenConfigDialog, UpdateConfig } from './config.actions';
import { MatDialog } from '@angular/material';
import { ConfigurationDialogComponent } from '../configuration-dialog/configuration-dialog.component';

@Injectable()
export class ConfigEffects {
    @Effect()
    checkConfigExists$ = this.actions$.ofType(ROUTER_NAVIGATION).pipe(
        first(),
        switchMap(nav => {
            return combineLatest(
                of(nav),
                this.store$.select('hue', 'api')
            ).pipe(first())
        }),
        switchMap(([ nav, config ] : [ RouterNavigationAction, ApiData ]) => {
            const hasConfig = config.account && config.bridge;
            
            if(!hasConfig) {
                return of(new OpenSetupDialog({ data: config, disableClose: true }));
            }
            return NEVER
        })
    );
    
    @Effect()
    openConfigDialog$ = this.actions$.ofType(ConfigActionTypes.OpenConfig).pipe(
        switchMap((action : OpenConfigDialog) => {
            const dialog = this.dialog.open(ConfigurationDialogComponent, action.payload);
            
            return dialog.afterClosed();
        }),
        switchMap(result => {
            return result ? of(new UpdateConfig(result)) : NEVER;
        })
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<AppState>,
                protected readonly dialog : MatDialog) {}
}
