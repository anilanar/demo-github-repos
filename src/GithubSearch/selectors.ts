import { Repository, WithRepos } from './types';

export const getRepos = (state: WithRepos): Repository[] =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    state.entities.repoIds?.map(id => state.entities.repoById![id]) ?? [];
