import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { apiReducer } from './+state/api.reducer';

@NgModule({
    imports: [
        StoreModule.forFeature('api', apiReducer)
    ]
})
export class ApiModule {}
