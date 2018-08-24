import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { first, switchMap } from 'rxjs/operators';
import { ConfigData, ConfigState } from './config.reducer';
import { Store } from '@ngrx/store';
import { combineLatest, NEVER, of } from 'rxjs';
import { OpenSetupDialog } from '../setup/+state/setup.actions';

@Injectable()
export class ConfigEffects {
    @Effect()
    checkConfigExists$ = this.actions$.ofType(ROUTER_NAVIGATION).pipe(
        first(),
        switchMap(nav => {
            return combineLatest(
                of(nav),
                this.store$.select('config')
            ).pipe(first())
        }),
        switchMap(([ nav, config ] : [ RouterNavigationAction, ConfigData ]) => {
            const hasConfig = config.account && config.bridge;
            
            if(!hasConfig) {
                return of(new OpenSetupDialog({ data: config, disableClose: true }));
            }
            return NEVER
        })
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<ConfigState>) {}
}
