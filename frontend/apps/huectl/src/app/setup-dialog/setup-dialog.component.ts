import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfigData } from '../+state/config.reducer';
import { Register, ResetSearchBridges, SearchBridges } from '../+state/setup.actions';
import { AppState } from '../+state/app.state';
import { Store } from '@ngrx/store';
import { SetupData } from '../+state/setup.reducer';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { selectHueApi } from '@huectl/hue';

@Component({
    selector     : 'hc-setup-dialog',
    templateUrl  : './setup-dialog.component.html',
    styleUrls    : [ './setup-dialog.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class SetupDialogComponent implements OnInit {
    readonly bridgeControl = new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
    ]);
    
    readonly accountControl = new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
    ]);
    
    readonly form = new FormGroup({
        bridge: this.bridgeControl,
        account: this.accountControl
    });
    
    state : SetupData;
    
    constructor(public readonly ref : MatDialogRef<SetupDialogComponent, ConfigData>,
                protected readonly store : Store<AppState>,
                @Inject(MAT_DIALOG_DATA) data : ConfigData | undefined) {
        if(data) {
            this.form.patchValue(data);
        }
    }
    
    ngOnInit() {
        const bridgeInvalid = this.bridgeControl.statusChanges.pipe(
            startWith('INVALID'),
            distinctUntilChanged(),
            map(status => status === 'INVALID')
        );
        
        bridgeInvalid.subscribe(invalid => {
            if(invalid) {
                this.accountControl.disable();
            } else {
                this.accountControl.enable();
            }
        });

        this.store.select('setup').subscribe(state => {
            this.state = state;
        });
    
        this.store.select(selectHueApi).subscribe(config => {
            if(config.bridge) {
                this.bridgeControl.patchValue(config.bridge);
            }
            if(config.account) {
                this.accountControl.patchValue(config.account);
            }
        })
    }
    
    searchForBridge() {
        this.bridgeControl.markAsUntouched();
        this.store.dispatch(new SearchBridges());
    }
    
    resetBridgeSearch() {
        this.store.dispatch(new ResetSearchBridges())
    }
    
    register() {
        if(this.accountControl.value) {
            return;
        }
        
        this.store.dispatch(new Register(this.bridgeControl.value));
    }
    
    save() {
        this.ref.close(this.form.value);
    }
}
