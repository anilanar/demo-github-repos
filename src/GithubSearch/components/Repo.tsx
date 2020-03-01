import styled from '@emotion/styled/macro';
import React from 'react';

import { ListItem } from '../../components';
import { Repository } from '../types';

interface RepoProps {
    repo: Repository;
}

export const Repo = ({ repo }: RepoProps): JSX.Element => {
    return (
        <RepoItem>
            <h3>
                <RepoLink
                    href={repo.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {repo.name}
                </RepoLink>
            </h3>
            <p>{repo.description}</p>
        </RepoItem>
    );
};

const RepoItem = styled(ListItem)`
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-bottom: 1px solid #ccc;
`;

const RepoLink = styled.a`
    color: #0366d6;
`;
