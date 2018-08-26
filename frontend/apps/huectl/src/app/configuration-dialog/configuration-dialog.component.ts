import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ILightGroup } from 'node-hue-api';
import { MatDialogRef } from '@angular/material';
import { SetupDialogComponent } from '../setup-dialog/setup-dialog.component';
import { ConfigData } from '../+state/config.reducer';
import { GetGroupsAction, selectAllGroups } from '@huectl/hue';

@Component({
    selector     : 'hc-configuration-dialog',
    templateUrl  : './configuration-dialog.component.html',
    styleUrls    : [ './configuration-dialog.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationDialogComponent implements OnInit {
    readonly form = new FormGroup({
        room: new FormControl(null)
    });
    
    rooms : Observable<ILightGroup[]>;
    
    constructor(protected readonly ref : MatDialogRef<SetupDialogComponent, ConfigData>,
                protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.rooms = this.store.select(selectAllGroups);
        this.store.dispatch(new GetGroupsAction());
        
        this.store.select('config').subscribe(config => {
            this.form.patchValue(config);
        });
    }
    
    save() {
        this.ref.close(this.form.value);
    }
}
