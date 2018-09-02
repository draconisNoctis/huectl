import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './+state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuCloseAction } from './+state/menu.actions';
import { OpenSetupDialog } from './+state/setup.actions';
import { OpenConfigDialog } from './+state/config.actions';

@Component({
    selector     : 'hc-root',
    templateUrl  : './app.component.html',
    styleUrls    : [ './app.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    menuOpened? : Observable<boolean>;
    
    constructor(protected readonly store : Store<AppState>) {
    
    }
    
    ngOnInit() : void {
        this.menuOpened = this.store.pipe(
            select('menu', 'opened'),
        );
    }
    
    closeMenu() {
        this.store.dispatch(new MenuCloseAction());
    }
    
    openSetup() {
        this.closeMenu();
        this.store.dispatch(new OpenSetupDialog());
    }
    
    openConfig() {
        this.closeMenu();
        this.store.dispatch(new OpenConfigDialog());
    }
}
