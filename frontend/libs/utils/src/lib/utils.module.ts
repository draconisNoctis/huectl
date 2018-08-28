import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssVarDirective } from './css-var.directive';

@NgModule({
    imports     : [ CommonModule ],
    declarations: [ CssVarDirective ],
    exports     : [ CssVarDirective ]
})
export class UtilsModule {
}
