import { Injectable, Inject, Renderer2 } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { distinctUntilChanged, first, pairwise, startWith, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { combineLatest, NEVER, of } from 'rxjs';
import { OpenSetupDialog } from './setup.actions';
import { ApiData } from '@huectl/hue';
import { AppState } from './app.state';
import { ConfigActionTypes, OpenConfigDialog, UpdateConfig } from './config.actions';
import { MatDialog } from '@angular/material';
import { ConfigurationDialogComponent } from '../configuration-dialog/configuration-dialog.component';
import { DOCUMENT } from '@angular/common';

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
    
    @Effect({ dispatch: false })
    themeClass$ = this.store$.pipe(
        select('config', 'theme'),
        startWith(null),
        distinctUntilChanged(),
        pairwise(),
        tap(([ previous, current ]) => {
            if(previous) {
                this.document.body.classList.remove(previous);
            }
            this.document.body.classList.add(current);
        })
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<AppState>,
                protected readonly dialog : MatDialog,
                @Inject(DOCUMENT) protected readonly document : Document) {}
}
