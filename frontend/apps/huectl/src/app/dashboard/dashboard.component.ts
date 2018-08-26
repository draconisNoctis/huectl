import { Component, OnInit } from '@angular/core';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { OpenSetupDialog } from '../+state/setup.actions';
import { OpenConfigDialog } from '../+state/config.actions';

@Component({
    selector   : 'hc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : [ './dashboard.component.sass' ]
})
export class DashboardComponent implements OnInit {
    
    constructor(protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
    }
    
    openSetup() {
        this.store.dispatch(new OpenSetupDialog());
    }
    
    openConfig() {
        this.store.dispatch(new OpenConfigDialog());
    }
}
