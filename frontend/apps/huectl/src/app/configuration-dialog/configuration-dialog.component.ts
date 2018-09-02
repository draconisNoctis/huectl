import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../+state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ILightGroup } from 'node-hue-api';
import { MatDialogRef } from '@angular/material';
import { SetupDialogComponent } from '../setup-dialog/setup-dialog.component';
import { ConfigData } from '../+state/config.reducer';
import { selectAllGroupsGroupedByType } from '@huectl/hue';
import { Dictionary } from '@ngrx/entity';

@Component({
    selector     : 'hc-configuration-dialog',
    templateUrl  : './configuration-dialog.component.html',
    styleUrls    : [ './configuration-dialog.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class ConfigurationDialogComponent implements OnInit {
    readonly form = new FormGroup({
        room: new FormControl(null),
        theme: new FormControl(null, Validators.required)
    });
    
    rooms? : Observable<Dictionary<ILightGroup[]>>;
    
    readonly themes = [
        { id: 'dark-red', name: 'Dark Red' },
        { id: 'light-red', name: 'Light Red' },
        { id: 'dark-green', name: 'Dark green' },
        { id: 'light-green', name: 'Light green' },
        { id: 'dark-indigo-pink', name: 'Dark Indigo Pink' },
        { id: 'light-indigo-pink', name: 'Light Indigo Pink' }
    ];
    
    constructor(protected readonly ref : MatDialogRef<SetupDialogComponent, ConfigData>,
                protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.rooms = this.store.pipe(select(selectAllGroupsGroupedByType));
        
        this.store.select('config').subscribe(config => {
            this.form.patchValue(config);
        });
    }
    
    save() {
        this.ref.close(this.form.value);
    }
}
