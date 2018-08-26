import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OpenSetupDialog } from '../+state/setup.actions';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { OpenConfigDialog } from '../+state/config.actions';
import { GetRoomsAction } from '../+state/rooms.actions';
import { Observable } from 'rxjs/Observable';
import { ILightGroup } from 'node-hue-api';
import { selectAllRooms } from '../+state/rooms.reducer';

@Component({
  selector: 'hc-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GroupsComponent implements OnInit {
    
    rooms : Observable<ILightGroup[]>;
    
    constructor(protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.rooms = this.store.select(selectAllRooms);
        this.store.dispatch(new GetRoomsAction());
    }
    
    openSetup() {
        this.store.dispatch(new OpenSetupDialog());
    }
    
    openConfig() {
        this.store.dispatch(new OpenConfigDialog());
    }
}
