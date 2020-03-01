import { createAction } from 'deox';

import { RouteName } from './types';

export const RouteHome = createAction(
    RouteName.Home,
    resolve => (username: string | null) =>
        resolve(
            {},
            {
                query: {
                    u: username ?? undefined,
                },
            },
        ),
);

export const RouteSettings = createAction(RouteName.Settings);
