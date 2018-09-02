import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from '../+state/app.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ILightGroup, IScene } from 'node-hue-api';
import {
    GroupActivateSceneAction,
    GroupSetStateAction,
    selectAllGroupsWithLightsGroupedByType,
    selectAllScenes
} from '@huectl/hue';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { bufferTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, merge, NEVER, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'hc-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GroupsComponent implements OnInit {
    form = new FormArray([]);
    
    groups? : Observable<ILightGroup[]>;
    scenes? : Observable<IScene[]>;
    pageTitle? : Observable<string>;
    
    userInteraction = new BehaviorSubject<boolean>(false);
    
    protected readonly titles : { [key: string]: string } = {
        Room: this.i18n('Rooms'),
        LightGroup: this.i18n('Light Groups')
    };
    
    constructor(protected readonly route : ActivatedRoute,
                protected readonly store : Store<AppState>,
                protected readonly i18n : I18n) {
    }
    
    ngOnInit() {
        this.pageTitle = this.route.data.pipe(map(data => this.titles[data.type]!));
        this.groups = combineLatest(
            this.store.pipe(select(selectAllGroupsWithLightsGroupedByType)),
            this.route.data.pipe(map(data => data.type as 'Room'|'LightGroup'))
        ).pipe(
            map(([types, type] ) => types && types[type]),
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
            switchMap(b => b ? NEVER : this.groups!)
        ).subscribe(groups => {
            while(this.form.length > groups.length) {
                this.form.removeAt(this.form.length - 1);
            }
            
            for(const [ i, room ] of groups.entries()) {
                if(this.form.length < i + 1) {
                    const toggle = new FormControl(room.state && room.state.any_on);
                    const bri = new FormControl(room.action && room.action.bri);
                    const hue = new FormControl(room.action && room.action.hue / 65536 * 360 | 0);
                    const sat = new FormControl(room.action && room.action.sat);
                    const ct = new FormControl(room.action && (room.action.ct - 500) * -1);
    
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
                        toggle: room.state && room.state.any_on,
                        bri   : room.action && room.action.bri,
                        hue   : room.action && room.action.hue / 65536 * 360 | 0,
                        sat   : room.action && room.action.sat,
                        ct    : room.action && (room.action.ct - 500) * -1
                    }, { emitEvent: false });
                }
            }
        });
    }
    
    trackById(room : ILightGroup) {
        return room.id;
    }
    
    activateScene(room : ILightGroup, scene : IScene) {
        this.store.dispatch(new GroupActivateSceneAction({ group: room.id, scene: scene.id }));
    }
    
    getScenesForGroup(group : ILightGroup) {
        if(!group.lights) {
            return NEVER;
        }
        return this.scenes!.pipe(
            map(scenes => scenes.filter(scene => !scene.recycle && scene.lights && group.lights!.some(light => scene.lights.some(l => l.toString() === light))))
        )
    }
}
