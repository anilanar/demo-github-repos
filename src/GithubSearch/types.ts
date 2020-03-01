export interface WithRepos {
    entities: {
        repoById?: GithubEntities['repoById'];
        repoIds?: string[];
    };
}

export interface GithubEntities {
    repoById: { [id: string]: Repository };
}

export interface Repository {
    id: string;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
}
