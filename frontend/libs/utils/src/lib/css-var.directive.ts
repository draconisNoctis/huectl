import { Directive, ElementRef, Input, OnChanges, Renderer2, RendererStyleFlags2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[hcCssVar]'
})
export class CssVarDirective implements OnChanges {
    
    @Input('hcCssVar')
    vars? : {};
    
    constructor(protected readonly ref : ElementRef,
                protected readonly renderer : Renderer2) {
    }
    
    ngOnChanges(changes : SimpleChanges) : void {
        if(changes.vars) {
            if(changes.vars.previousValue) {
                for(const key in changes.vars.previousValue) {
                    this.renderer.setStyle(this.ref.nativeElement,
                                            `--${key}`,
                                            null,
                                            RendererStyleFlags2.DashCase);
                }
            }
            if(changes.vars.currentValue) {
                for(const key in changes.vars.currentValue) {
                    this.renderer.setStyle(this.ref.nativeElement,
                                            `--${key}`,
                                            changes.vars.currentValue[ key ],
                                            RendererStyleFlags2.DashCase);
                }
            }
        }
    }
    
}
