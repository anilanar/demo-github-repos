import { normalize, schema } from 'normalizr';
import { QueryConfig } from 'redux-query';

import { Settings } from '../types';
import { GithubEntities, Repository, WithRepos } from './types';

const repo = new schema.Entity<Repository>('repoById');

export const reposByUsername = (
    username: string,
    settings?: Settings | null,
): QueryConfig<WithRepos['entities']> => {
    const authorization =
        settings && `Basic ${btoa(`${settings.username}:${settings.token}`)}`;
    return {
        url: `https://api.github.com/users/${username}/repos`,
        transform: (body: Repository[]): WithRepos['entities'] => {
            const { entities, result } = normalize<
                Repository,
                GithubEntities,
                string[]
            >(body, new schema.Array(repo));

            return { repoById: entities.repoById, repoIds: result };
        },
        update: {
            repoById: (_, next): GithubEntities['repoById'] => next ?? {},
            repoIds: (_, next): string[] => next ?? [],
        },
        options: {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: authorization ?? '',
            },
        },
    };
};
