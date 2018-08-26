import { RoomsState } from './rooms.reducer';
import { ApiState } from '@huectl/api';
import { ConfigState } from './config.reducer';
import { SetupState } from './setup.reducer';

export interface AppState extends ApiState, RoomsState, ConfigState, SetupState {
}
