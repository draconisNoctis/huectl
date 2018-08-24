import { Component, OnInit } from '@angular/core';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { OpenSetupDialog } from '../setup/+state/setup.actions';

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
}
