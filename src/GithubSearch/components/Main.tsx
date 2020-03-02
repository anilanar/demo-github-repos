/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled/macro';
import { FormEvent } from 'react';
import Link from 'redux-first-router-link';

import { AdjustStroke, Form, Input, List } from '../../components';
import {
    GITHUB_USERNAME_PATTERN,
    GITHUB_USERNAME_VALIDATION_MESSAGE,
} from '../../const';
import { matchResponse, Response } from '../../hooks/useRequest';
import { RouteSettings } from '../../routes/actions';
import { Repository } from '../types';
import { Repo } from './Repo';

interface UserReposViewProps {
    username: string | null;
    setUsername: (newValue: string | null) => void;
    response: Response<Repository[]>;
}

export const Main = ({
    username,
    setUsername,
    response,
}: UserReposViewProps): JSX.Element => (
    <section>
        <h1 css={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Github Search</span>
            <Link to={RouteSettings()}>
                <AdjustStroke />
            </Link>
        </h1>
        <Form
            css={{ width: '100%' }}
            onSubmit={(e: FormEvent<HTMLFormElement>): void => {
                e.preventDefault();
                setUsername(e.currentTarget['username']?.value || null);
            }}
        >
            <SearchInput
                name="username"
                key={username ?? ''}
                defaultValue={username ?? ''}
                placeholder="Enter username..."
                pattern={GITHUB_USERNAME_PATTERN}
                title={GITHUB_USERNAME_VALIDATION_MESSAGE}
                autoComplete="off"
                inline
            />
            <output>
                <List css={{ marginTop: '1rem' }}>
                    {matchResponse(response, {
                        onInitial: () => 'Type a username and search.',
                        onSuccess: repos =>
                            repos.map(repo => (
                                <Repo repo={repo} key={repo.id} />
                            )),
                        onPending: () => 'Loading...',
                        onFailure: msg => `Failed: ${msg}`,
                        onEmpty: () => 'No repositories found.',
                    })}
                </List>
            </output>
        </Form>
    </section>
);

const SearchInput = styled(Input)`
    width: 100%;
    padding: 10px 10px 10px 30px;
    font-size: 1.45rem;
    font-weight: 300;
`;
