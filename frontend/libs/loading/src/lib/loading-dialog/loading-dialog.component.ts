import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'hc-loading-dialog',
    templateUrl  : './loading-dialog.component.html',
    styleUrls    : [ './loading-dialog.component.sass' ],
    encapsulation: ViewEncapsulation.None
})
export class LoadingDialogComponent implements OnInit {
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
}
