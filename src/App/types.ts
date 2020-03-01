import { EntitiesState, QueriesState } from 'redux-query';

export interface GlobalState {
    queries: QueriesState;
    entities: EntitiesState;
}
