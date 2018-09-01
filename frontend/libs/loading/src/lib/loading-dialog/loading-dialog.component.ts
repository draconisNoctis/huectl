import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector     : 'hc-loading-dialog',
    templateUrl  : './loading-dialog.component.html',
    styleUrls    : [ './loading-dialog.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class LoadingDialogComponent {
    title = 'Loading...';
    description? : string;
    
    
    constructor(@Inject(MAT_DIALOG_DATA) { title, description } : { title?: string, description?: string }) {
        title && (this.title = title);
        description && (this.description = description);
    }
}
