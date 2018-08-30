import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../+state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ILightGroup, IScene } from 'node-hue-api';
import {
    GetGroupsAction,
    GetLightsAction,
    GetScenesAction,
    GroupActivateSceneAction,
    GroupSetStateAction,
    selectAllGroupsWithLightsGroupedByType,
    selectAllScenes
} from '@huectl/hue';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { bufferTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, merge, NEVER } from 'rxjs';

@Component({
  selector: 'hc-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
    form = new FormArray([]);
    
    rooms : Observable<ILightGroup[]>;
    scenes : Observable<IScene[]>;
    
    userInteraction = new BehaviorSubject<boolean>(false);
    
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
        
        this.form.valueChanges.pipe(
            tap(() => this.userInteraction.next(true)),
            bufferTime(1000),
            filter(a => a.length === 0),
            tap(() => this.userInteraction.next(false))
        ).subscribe();
        
        this.userInteraction.pipe(
            distinctUntilChanged(),
            switchMap(b => b ? NEVER : this.rooms)
        ).subscribe(rooms => {
            while(this.form.length > rooms.length) {
                this.form.removeAt(this.form.length - 1);
            }
            
            for(const [ i, room ] of rooms.entries()) {
                if(this.form.length < i + 1) {
                    const toggle = new FormControl(room.state.any_on);
                    const bri = new FormControl(room.action.bri);
                    const hue = new FormControl(room.action.hue / 65536 * 360 | 0);
                    const sat = new FormControl(room.action.sat);
                    const ct = new FormControl((room.action.ct - 500) * -1);
    
                    const group = new FormGroup({ toggle, bri, hue, sat, ct });
    
                    merge(
                        merge(
                            bri.valueChanges.pipe(distinctUntilChanged(), map(bri => ({ on: true, bri }))),
                            hue.valueChanges.pipe(distinctUntilChanged(), map(hue => ({ on: true, hue: hue / 360 * (2 ** 16) | 0 }))),
                            sat.valueChanges.pipe(distinctUntilChanged(), map(sat => ({ on: true, sat }))),
                            ct.valueChanges.pipe(distinctUntilChanged(), map(ct => ({ on: true, ct: 500 - ct }))),
                        ).pipe(
                            bufferTime(250),
                            filter(a => !!a.length),
                            map(a => a.reduce((t, c) => ({ ...t, ...c }), {}))
                        ),
                        toggle.valueChanges.pipe(distinctUntilChanged(), map(on => ({ on })))
                    ).pipe(
                        map(state => new GroupSetStateAction({
                            group: room.id,
                            ...state
                        }))
                    ).subscribe(action => {
                        this.store.dispatch(action);
                    });
    
                    this.form.push(group);
                } else {
                    this.form.at(i).patchValue({
                        toggle: room.state.any_on,
                        bri   : room.action.bri,
                        hue   : room.action.hue / 65536 * 360 | 0,
                        sat   : room.action.sat,
                        ct    : (room.action.ct - 500) * -1
                    }, { emitEvent: false });
                }
            }
        });
        
        this.store.dispatch(new GetGroupsAction());
        this.store.dispatch(new GetLightsAction());
        this.store.dispatch(new GetScenesAction());
    }
    
    trackById(room : ILightGroup) {
        return room.id;
    }
    
    activateScene(room : ILightGroup, scene : IScene) {
        this.store.dispatch(new GroupActivateSceneAction({ group: room.id, scene: scene.id }));
    }
    
    getScenesForRoom(room : ILightGroup) {
        return this.scenes.pipe(
            map(scenes => scenes.filter(scene => !scene.recycle && room.lights.some(light => scene.lights.some(l => l.toString() === light))))
        )
    }
}
