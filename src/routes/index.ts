import { RouteName } from './types';

export { RouteName };

export const routesMap = {
    [RouteName.Home]: '/',
    [RouteName.Settings]: '/settings',
};

export * from './Router';
export * from './NotFound';
export * from './types';
