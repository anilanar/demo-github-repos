import { createAction } from 'deox';

import { Settings } from '../types';

export const saveSettings = createAction(
    'SAVE_SETTINGS',
    resolve => (settings: Settings | null) => resolve(settings),
);
