import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    SkipSelf,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { IScene } from 'node-hue-api';
import { MatSliderChange } from '@angular/material';
import { startWith } from 'rxjs/operators';
import { Color } from '@huectl/utils';

@Component({
    selector     : 'hc-hue-control',
    templateUrl  : './hue-control.component.html',
    styleUrls    : [ './hue-control.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class HueControlComponent implements OnInit {
    @Input()
    color? : string;
    
    @Input()
    scenes? : IScene[];
    
    @Output()
    triggerScene = new EventEmitter<IScene>();
    
    @ContentChild('hcTitle', { read: TemplateRef })
    title? : TemplateRef<any>;
    
    @ContentChild('hcLeadingAction', { read: TemplateRef })
    leadingAction? : TemplateRef<any>;
    
    @ContentChild('hcTrailingAction', { read: TemplateRef })
    trailingAction? : TemplateRef<any>;
    
    hueColor?: string;
    
    form?: FormGroup;
    
    constructor(@Optional() @SkipSelf() protected readonly controlContainer : ControlContainer) {
    
    }
    
    ngOnInit() {
        if(this.controlContainer.control instanceof FormGroup) {
            this.form = this.controlContainer.control;
    
            if(!this.form.contains('hue')) {
                this.form.addControl('hue', new FormControl())
            }
            
            const hue = this.form.get('hue')!;
            
            hue.valueChanges.pipe(startWith(hue.value)).subscribe(H => {
                this.hueColor = Color.fromHSV(H, 1, 1).toHtml();
            });
        }
    }
    
    changeFormValue(name: string, event : MatSliderChange) {
        this.form!.get(name)!.setValue(event.value);
    }
}
