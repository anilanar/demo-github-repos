import { applyMiddleware, combineReducers, createStore } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware } from 'redux-query';
import networkInterface from 'redux-query-interface-superagent';

import { getEntities, getQueries } from './selectors';

const reducer = combineReducers({
    entities: entitiesReducer,
    queries: queriesReducer,
});

export const store = createStore(
    reducer,
    applyMiddleware(queryMiddleware(networkInterface, getQueries, getEntities)),
);
