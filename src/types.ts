import { LocationState } from 'redux-first-router';
import { EntitiesState, ErrorsState, QueriesState } from 'redux-query';

export interface GlobalState {
    queries: QueriesState;
    entities: EntitiesState;
    errors: ErrorsState;
    location: LocationState;
    settings: Settings | null;
}

export interface Settings {
    username: string;
    token: string;
}
