import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoadingRoomsAction, LoadRoomsAction, RoomActionTypes } from './rooms.actions';
import { first, map, switchMap } from 'rxjs/operators';
import { AppState } from './app.state';
import { RoomsData } from './rooms.reducer';
import { NEVER } from 'rxjs/internal/observable/never';
import { GroupsService } from '@huectl/api';
import { merge, of } from 'rxjs';

@Injectable()
export class RoomsEffects {
    @Effect()
    getRooms$ = this.actions$.ofType(RoomActionTypes.GET_ROOMS).pipe(
        switchMap(() => this.store$.select('rooms').pipe(first())),
        switchMap((rooms : RoomsData) => {
            if(!rooms.loading && 0 === rooms.ids.length) {
                return merge(
                    of(new LoadingRoomsAction()),
                    this.groupsService.getGroups('Room').pipe(
                        map(groups => new LoadRoomsAction({ rooms: groups }))
                    )
                );
            }
            return NEVER;
        }),
        
    );
    
    constructor(protected readonly actions$ : Actions,
                protected readonly store$ : Store<AppState>,
                protected readonly groupsService : GroupsService) {
    }
}
