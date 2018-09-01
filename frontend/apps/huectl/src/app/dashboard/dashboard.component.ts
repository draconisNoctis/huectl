import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../+state/app.state';
import { select, Store } from '@ngrx/store';
import { OpenSetupDialog } from '../+state/setup.actions';
import { OpenConfigDialog } from '../+state/config.actions';
import { selectAllGroupsGroupedByType } from '@huectl/hue';
import { map } from 'rxjs/operators';
import { ILightGroup } from 'node-hue-api';

@Component({
    selector   : 'hc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : [ './dashboard.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    roomCount = { total: 0, on: 0 };
    lightGroupCount = { total: 0, on: 0 };
    
    constructor(protected readonly store : Store<AppState>) {
    
    }
    
    ngOnInit() {
        const groups = this.store.pipe(
            select(selectAllGroupsGroupedByType)
        );
        
        groups.pipe(
            select('Room'),
            map((a? : ILightGroup[]) => a ? { total: a.length, on: a.filter(l => l.state && l.state.any_on).length } : { total: 0, on: 0 })
        ).subscribe(roomCount => this.roomCount = roomCount);
        
        groups.pipe(
            select('LightGroup'),
            map((a? : ILightGroup[]) => a ? { total: a.length, on: a.filter(l => l.state && l.state.any_on).length } : { total: 0, on: 0 })
        ).subscribe(lightGroupCount => this.lightGroupCount = lightGroupCount);
    }
    
    openSetup() {
        this.store.dispatch(new OpenSetupDialog());
    }
    
    openConfig() {
        this.store.dispatch(new OpenConfigDialog());
    }
    
}
