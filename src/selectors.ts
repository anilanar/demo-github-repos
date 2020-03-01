import { LocationState } from 'redux-first-router';
import { EntitiesState, ErrorsState, QueriesState } from 'redux-query';

import { GlobalState, Settings } from './types';

export type QueryError = ErrorsState[string];

export const getQueries = (state: GlobalState): QueriesState => state.queries;

export const getEntities = (state: GlobalState): EntitiesState =>
    state.entities;

export const getErrors = (state: GlobalState): ErrorsState => state.errors;

export const getErrorByKey = (key: string) => (
    state: GlobalState,
): string | undefined => state.errors[key]?.responseBody?.message;

export const getLocation = (state: GlobalState): LocationState =>
    state.location;

export const getSettings = (state: GlobalState): Settings | null =>
    state.settings;
