/**
 * An enhancer and a middleware to store settings in
 * local storage.
 * TODO: Replace with redux-persist to save time from
 * maintainance.
 */

import { isOfType } from 'deox';
import { either as E, function as F, option as O, pipeable as P } from 'fp-ts';
import * as t from 'io-ts';
import { Middleware, StoreEnhancer } from 'redux';

import { saveSettings } from './actions';

const SettingsCodec = t.strict({
    username: t.string,
    token: t.string,
});

const STORAGE_KEY = 'github:settings';

export const enhancer: StoreEnhancer = createStore => (
    reducer,
    preloadedState,
) => {
    // Type-safe local storage decoding, throwing
    // away invalid settings, catching and ignoring errors
    // that may be thrown by localStorage or by JSON.parse.
    const settings = P.pipe(
        E.tryCatch(
            () => window.localStorage.getItem(STORAGE_KEY),
            () => [],
        ),
        E.chain(str => (str ? E.parseJSON(str, () => []) : E.left([]))),
        E.chain(SettingsCodec.decode),
        O.fromEither,
        O.toNullable,
    );

    // Add settings to preloaded state
    const newPreloadedState =
        preloadedState === undefined
            ? {
                  settings,
              }
            : { ...preloadedState, settings };

    const store = createStore(reducer, F.unsafeCoerce(newPreloadedState));
    return store;
};

/**
 * Everytime `saveSettings` is dispatched, saves
 * settings in local storage.
 */
export const middleware: Middleware = () => next => action => {
    if (isOfType(saveSettings, action)) {
        const settings = action.payload;
        // localStorage and JSON.stringify is always dangerous
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.warn('Local storage is not available.');
        }
    }
    return next(action);
};
