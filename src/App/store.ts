import queryString from 'query-string';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRoutes } from 'redux-first-router';
import * as ReduxQuery from 'redux-query';
import networkInterface from 'redux-query-interface-superagent';

import * as Settings from '../GithubSettings';
import { routesMap } from '../routes';
import { getEntities, getQueries } from '../selectors';

const Routes = connectRoutes(routesMap, {
    querySerializer: queryString,
});

const reducer = combineReducers({
    entities: ReduxQuery.entitiesReducer,
    queries: ReduxQuery.queriesReducer,
    errors: ReduxQuery.errorsReducer,
    location: Routes.reducer,
    settings: Settings.reducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (config: {}) => typeof compose;
    }
}

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        Routes.enhancer,
        Settings.enhancer,
        applyMiddleware(
            Routes.middleware,
            ReduxQuery.queryMiddleware(
                networkInterface,
                getQueries,
                getEntities,
            ),
            Settings.middleware,
        ),
    ),
);
