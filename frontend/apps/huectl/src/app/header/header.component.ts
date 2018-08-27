import { Component, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { OpenSetupDialog } from '../+state/setup.actions';
import { OpenConfigDialog } from '../+state/config.actions';

@Component({
    selector     : 'hc-header',
    templateUrl  : './header.component.html',
    styleUrls    : [ './header.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

    @ContentChild('title', { read: TemplateRef })
    title : TemplateRef<any>;
    
    constructor(protected readonly store : Store<AppState>) {
    }
    
    openSetup() {
        this.store.dispatch(new OpenSetupDialog());
    }
    
    openConfig() {
        this.store.dispatch(new OpenConfigDialog());
    }
}
