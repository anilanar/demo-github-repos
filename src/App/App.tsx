import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';

import { GithubSearch } from '../GithubSearch';
import { GithubSettings } from '../GithubSettings';
import { RouteName, Router } from '../routes';
import { getQueries } from '../selectors';
import { Layout } from './Layout';
import { store } from './store';

const pageMap = {
    [RouteName.Home]: GithubSearch,
    [RouteName.Settings]: GithubSettings,
};

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <ReduxQueryProvider queriesSelector={getQueries}>
                <Layout>
                    <Router pageMap={pageMap} />
                </Layout>
            </ReduxQueryProvider>
        </Provider>
    );
};
