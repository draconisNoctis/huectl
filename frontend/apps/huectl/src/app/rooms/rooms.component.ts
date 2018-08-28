import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../+state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ILightGroup, IScene } from 'node-hue-api';
import {
    GetGroupsAction,
    GetLightsAction,
    GetScenesAction, GroupActivateSceneAction,
    GroupSetStateAction,
    selectAllGroupsWithLightsGroupedByType,
    selectAllScenes
} from '@huectl/hue';
import { MatSliderChange } from '@angular/material';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { bufferTime, filter, first, map, startWith } from 'rxjs/operators';
import { Color } from '@huectl/utils';
import { merge } from 'rxjs/index';

@Component({
  selector: 'hc-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
    form = new FormArray([]);
    
    colors : string[] = [];
    
    rooms : Observable<ILightGroup[]>;
    scenes : Observable<IScene[]>;
    
    constructor(protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.rooms = this.store.pipe(
            select(selectAllGroupsWithLightsGroupedByType),
            select('Room'),
            filter(Boolean)
        );
        
        this.scenes = this.store.pipe(
            select(selectAllScenes)
        );
        
        this.rooms.pipe(
            first()
        ).subscribe(rooms => {
            for(const [i, room] of rooms.entries()) {
                const toggle = new FormControl(room.state.any_on);
                const bri = new FormControl(room.action.bri);
                const hue = new FormControl(room.action.hue / 65535 * 360 |0);
                const sat = new FormControl(room.action.sat);
                const ct = new FormControl((room.action.ct - 500) * -1);

                hue.valueChanges.pipe(startWith(hue.value)).subscribe(H => {
                    this.colors[i] = Color.fromHSV(H, 1, 1).toHtml();
                });

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
                    map(state => new GroupSetStateAction({
                        group: room.id,
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
        this.store.dispatch(new GetScenesAction());
    }
    
    trackById(room : ILightGroup) {
        return room.id;
    }
    
    changeFormValue(index : number, name: string, event : MatSliderChange) {
        this.form.get([ index, name ]).setValue(event.value);
    }
    
    roomHasScene(room : ILightGroup, scene : IScene) {
        return !scene.recycle && room.lights.some(light => scene.lights.some(l => l.toString() === light));
    }
    
    activateScene(room : ILightGroup, scene : IScene) {
        this.store.dispatch(new GroupActivateSceneAction({ group: room.id, scene: scene.id }));
    }
}
