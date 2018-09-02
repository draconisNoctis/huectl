import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ILight, ILightGroup } from 'node-hue-api';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { bufferTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { LightSetStateAction, selectAllGroupsWithLights } from '@huectl/hue';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { BehaviorSubject, NEVER } from 'rxjs/index';

@Component({
    selector     : 'hc-group-lights',
    templateUrl  : './group-lights.component.html',
    styleUrls    : [ './group-lights.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class GroupLightsComponent implements OnInit {
    group? : Observable<ILightGroup>;
    
    form = new FormArray([]);
    
    userInteraction = new BehaviorSubject<boolean>(false);
    
    constructor(protected readonly route : ActivatedRoute,
                protected readonly store : Store<AppState>) {
    }
    
    ngOnInit() {
        this.group = this.route.paramMap.pipe(
            map(m => m.get('id')!),
            switchMap(id => this.store.pipe(
                select(selectAllGroupsWithLights),
                map(groups => groups.find(group => group.id === id))
            )),
            filter((group : ILightGroup|null) : group is ILightGroup => !!(group && group.$lights && group.$lights.every(light => !!light)))
        );
    
        this.form.valueChanges.pipe(
            tap(() => this.userInteraction.next(true)),
            bufferTime(1000),
            filter(a => a.length === 0),
            tap(() => this.userInteraction.next(false))
        ).subscribe();
    
        this.userInteraction.pipe(
            distinctUntilChanged(),
            switchMap(b => b ? NEVER : this.group!)
        ).subscribe((group : ILightGroup) => {
            while(this.form.length > group.$lights!.length) {
                this.form.removeAt(this.form.length - 1);
            }
    
            for(const [ i, light ] of group.$lights!.entries()) {
                if(this.form.length < i + 1) {
                    const toggle = new FormControl(light.state.on);
                    const bri = new FormControl(light.state.bri);
                    const hue = new FormControl((light.state.hue || 0) / 65536 * 360 |0);
                    const sat = new FormControl(light.state.sat);
                    const ct = new FormControl(((light.state.ct || 0) - 500) * -1);
    
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
                        map(state => new LightSetStateAction({
                            light: light.id!,
                            ...state
                        }))
                    ).subscribe(action => {
                        this.store.dispatch(action);
                    });
    
                    this.form.push(group);
                } else {
                    this.form.at(i).patchValue({
                        toggle: light.state.on,
                        bri   : light.state.bri,
                        hue   : (light.state.hue || 0)/ 65536 * 360 | 0,
                        sat   : light.state.sat,
                        ct    : ((light.state.ct || 0) - 500) * -1
                    }, { emitEvent: false });
                }
            }
        });
    }
    
    trackById(light : ILight) {
        return light.id;
    }
}
