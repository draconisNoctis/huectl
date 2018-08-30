import { HueState } from '@huectl/hue';
import { ConfigState } from './config.reducer';
import { SetupState } from './setup.reducer';
import { MenuState } from './menu.reducer';

export interface AppState extends HueState, ConfigState, SetupState, MenuState {
}
