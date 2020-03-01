import { EntitiesState, QueriesState } from 'redux-query';

import { GlobalState } from './types';

export const getQueries = (state: GlobalState): QueriesState => state.queries;
export const getEntities = (state: GlobalState): EntitiesState =>
    state.entities;
