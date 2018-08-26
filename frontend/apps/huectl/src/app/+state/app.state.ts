import { HueState } from '@huectl/hue';
import { ConfigState } from './config.reducer';
import { SetupState } from './setup.reducer';

export interface AppState extends HueState, ConfigState, SetupState {
}
