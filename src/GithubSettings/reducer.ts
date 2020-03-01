import { createReducer } from 'deox';

import { Settings } from '../types';
import { saveSettings } from './actions';

const defaultState = null as Settings | null;

export const reducer = createReducer(defaultState, handle => [
    handle(saveSettings, (_, { payload }) => payload),
]);
