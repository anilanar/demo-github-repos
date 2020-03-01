import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';

import { getQueries } from './selectors';
import { store } from './store';

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <ReduxQueryProvider queriesSelector={getQueries}>
                Hello
            </ReduxQueryProvider>
        </Provider>
    );
};
