import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRequest } from '../hooks';
import { RouteHome } from '../routes/actions';
import { getLocation, getSettings } from '../selectors';
import { Main } from './components';
import * as Queries from './queries';
import { getRepos } from './selectors';

/**
 * Displays github repositories of a given username.
 * The source of username is the url search parameter named "u".
 */
export const GithubSearch = (): JSX.Element => {
    const { query: { u: username = null } = {} } = useSelector(getLocation);
    const dispatch = useDispatch();
    const setUsername = (username: string | null): void => {
        dispatch(RouteHome(username));
    };
    const settings = useSelector(getSettings);

    const response = useRequest(
        username !== null
            ? {
                  ...Queries.reposByUsername(username, settings),
                  force: true,
              }
            : null,
        getRepos,
    );

    return (
        <Main
            username={username}
            setUsername={setUsername}
            response={response}
        />
    );
};
