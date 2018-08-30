import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ILight, ILightGroup } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { bufferTime, distinctUntilChanged, filter, first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { GetGroupsAction, GetLightsAction, LightSetStateAction, selectAllGroupsWithLights } from '@huectl/hue';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Color } from '@huectl/utils';
import { merge } from 'rxjs';
import { MatSliderChange } from '@angular/material';
import { BehaviorSubject, NEVER } from 'rxjs/index';

@Component({
    selector     : 'hc-room-lights',
    templateUrl  : './room-lights.component.html',
    styleUrls    : [ './room-lights.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class RoomLightsComponent implements OnInit {
    room : Observable<ILightGroup>;
    
    form = new FormArray([]);
    
    userInteraction = new BehaviorSubject<boolean>(false);
    
    constructor(protected readonly route : ActivatedRoute,
                protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.room = this.route.paramMap.pipe(
            map(m => m.get('id')!),
            switchMap(id => this.store.pipe(
                select(selectAllGroupsWithLights),
                map(groups => groups.find(group => group.id === id))
            )),
            filter(group => !!(group && group.$lights && group.$lights.every(light => !!light)))
        );
    
        this.form.valueChanges.pipe(
            tap(() => this.userInteraction.next(true)),
            bufferTime(1000),
            filter(a => a.length === 0),
            tap(() => this.userInteraction.next(false))
        ).subscribe();
    
        this.userInteraction.pipe(
            distinctUntilChanged(),
            switchMap(b => b ? NEVER : this.room)
        ).subscribe(group => {
            while(this.form.length) {
                this.form.removeAt(0);
            }
    
            for(const [i, light] of group.$lights.entries()) {
                const toggle = new FormControl(light.state.on);
                const bri = new FormControl(light.state.bri);
                const hue = new FormControl(light.state.hue / 65535 * 360 |0);
                const sat = new FormControl(light.state.sat);
                const ct = new FormControl((light.state.ct - 500) * -1);
                
                const group = new FormGroup({ toggle, bri, hue, sat, ct });
                
                merge(
                    merge(
                        bri.valueChanges.pipe(map(bri => ({ on: true, bri }))),
                        hue.valueChanges.pipe(map(hue => ({ on: true, hue: hue / 360 * (2 ** 16) }))),
                        sat.valueChanges.pipe(map(sat => ({ on: true, sat }))),
                        ct.valueChanges.pipe(map(ct => ({ on: true, ct: 500 - ct }))),
                    ).pipe(
                        bufferTime(250),
                        filter(a => !!a.length),
                        map(a => a.reduce((t, c) => ({ ...t, ...c }), {}))
                    ),
                    toggle.valueChanges.pipe(map(on => ({ on })))
                ).pipe(
                    map(state => new LightSetStateAction({
                        light: light.id,
                        ...state
                    }))
                ).subscribe(action => {
                    this.store.dispatch(action);
                });
                
                this.form.push(group);
            }
        });
    
        this.store.dispatch(new GetGroupsAction());
        this.store.dispatch(new GetLightsAction());
    }
    
    trackById(light : ILight) {
        return light.id;
    }
}
