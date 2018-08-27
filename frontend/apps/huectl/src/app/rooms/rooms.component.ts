import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../+state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ILightGroup } from 'node-hue-api';
import {
    GetGroupsAction,
    GetLightsAction,
    GroupOffAction,
    GroupOnAction,
    selectAllGroupsWithLightsGroupedByType
} from '@huectl/hue';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'hc-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
    
    rooms : Observable<ILightGroup[]>;
    
    constructor(protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.rooms = this.store.pipe(
            select(selectAllGroupsWithLightsGroupedByType),
            select('Room')
        );
        this.store.dispatch(new GetGroupsAction());
        this.store.dispatch(new GetLightsAction());
    }
    
    toggle(event : MatSlideToggleChange, group : ILightGroup) {
        if(event.checked) {
            this.store.dispatch(new GroupOnAction({ group: group.id }));
        } else {
            this.store.dispatch(new GroupOffAction({ group: group.id }));
        }
    }
}
