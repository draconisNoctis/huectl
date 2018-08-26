import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { GetRoomsAction } from '../+state/rooms.actions';
import { Observable } from 'rxjs/Observable';
import { selectAllRooms } from '../+state/rooms.reducer';
import { ILightGroup } from 'node-hue-api';
import { MatDialogRef } from '@angular/material';
import { SetupDialogComponent } from '../setup-dialog/setup-dialog.component';
import { ConfigData } from '../+state/config.reducer';

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
        this.rooms = this.store.select(selectAllRooms);
        this.store.dispatch(new GetRoomsAction());
        
        this.store.select('config').subscribe(config => {
            this.form.patchValue(config);
        });
    }
    
    save() {
        this.ref.close(this.form.value);
    }
}
