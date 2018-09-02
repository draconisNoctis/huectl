import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
    selector     : 'hc-loading-dialog',
    templateUrl  : './loading-dialog.component.html',
    styleUrls    : [ './loading-dialog.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class LoadingDialogComponent {
    title = this.i18n('Loading...');
    description? : string;
    
    
    constructor(@Inject(MAT_DIALOG_DATA) { title, description } : { title?: string, description?: string },
                protected readonly i18n : I18n) {
        console.log(i18n);
        title && (this.title = title);
        description && (this.description = description);
    }
}
