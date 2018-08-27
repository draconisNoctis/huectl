import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ILightGroup } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { map, switchMap } from 'rxjs/operators';
import {
    GetGroupsAction,
    GetLightsAction,
    LightOffAction,
    LightOnAction,
    selectAllGroupsWithLights
} from '@huectl/hue';

@Component({
    selector     : 'hc-room-lights',
    templateUrl  : './room-lights.component.html',
    styleUrls    : [ './room-lights.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class RoomLightsComponent implements OnInit {
    room : Observable<ILightGroup>;
    
    constructor(protected readonly route : ActivatedRoute,
                protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.room = this.route.paramMap.pipe(
            map(m => m.get('id')!),
            switchMap(id => this.store.pipe(
                select(selectAllGroupsWithLights),
                map(groups => groups.find(group => group.id === id))
            ))
        );
    
        this.store.dispatch(new GetGroupsAction());
        this.store.dispatch(new GetLightsAction());
    }
    
    
    lightOn(light : string) {
        this.store.dispatch(new LightOnAction({ light }));
    }
    
    lightOff(light : string) {
        this.store.dispatch(new LightOffAction({ light }));
    }
    
}
