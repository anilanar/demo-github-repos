import { useMemo } from 'react';

import { register } from './serviceWorker';

export const ServiceWorker = (): null => {
    useMemo(() => {
        register();
    }, []);
    return null;
};
