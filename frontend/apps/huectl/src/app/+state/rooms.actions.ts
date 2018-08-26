export enum RoomActionTypes {
    GET_ROOMS = '[Room] Get Rooms',
    LOADING_ROOMS = '[Room] Loading Rooms',
    LOAD_ROOMS = '[Room] Load Rooms'
}

export class GetRoomsAction {
    readonly type = RoomActionTypes.GET_ROOMS;
}

export class LoadingRoomsAction {
    readonly type = RoomActionTypes.LOADING_ROOMS;
}

export class LoadRoomsAction {
    readonly type = RoomActionTypes.LOAD_ROOMS;
    
    constructor(public readonly payload : { rooms : any[] }) {}
}

export type RoomsActions = GetRoomsAction | LoadingRoomsAction | LoadRoomsAction;
