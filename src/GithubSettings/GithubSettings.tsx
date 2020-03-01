/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled/macro';
import { createAction, createReducer } from 'deox';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'redux-first-router-link';

import {
    Button,
    Checkmark,
    Field,
    Form,
    Home,
    Input,
    Label,
} from '../components';
import {
    GITHUB_TOKEN_PATTERN,
    GITHUB_TOKEN_VALIDATION_MESSAGE,
    GITHUB_USERNAME_PATTERN,
    GITHUB_USERNAME_VALIDATION_MESSAGE,
} from '../const';
import { RouteHome } from '../routes/actions';
import { getSettings } from '../selectors';
import { saveSettings } from './actions';

const markDirty = createAction('MARK_DIRTY');
const markSaved = createAction('MARK_SAVED');
const reset = createAction('RESET');

interface FormState {
    isDirty: boolean;
    isSaved: boolean;
}

const defaultState: FormState = {
    isDirty: false,
    isSaved: false,
};
const formReducer = createReducer(defaultState, handle => [
    handle(markDirty, () => ({ isDirty: true, isSaved: false } as FormState)),
    handle(markSaved, () => ({ isDirty: false, isSaved: true } as FormState)),
    handle(reset, () => ({ isDirty: false, isSaved: false } as FormState)),
]);

export const GithubSettings = (): JSX.Element => {
    const dispatchRedux = useDispatch();
    const { username, token } = useSelector(getSettings) ?? {
        username: '',
        token: '',
    };

    const [state, dispatch] = useReducer(formReducer, defaultState);

    return (
        <section>
            <h1 css={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Github Settings</span>
                <Link to={RouteHome(null)}>
                    <Home />
                </Link>
            </h1>
            <Form
                onChange={() => dispatch(markDirty())}
                onSubmit={e => {
                    e.preventDefault();
                    const username = e.currentTarget['username'].value || null;
                    const token = e.currentTarget['token'].value || null;
                    if (username && token) {
                        dispatchRedux(saveSettings({ username, token }));
                    } else {
                        dispatchRedux(saveSettings(null));
                    }
                    dispatch(markSaved());
                }}
            >
                <Field>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        defaultValue={username}
                        pattern={GITHUB_USERNAME_PATTERN}
                        title={GITHUB_USERNAME_VALIDATION_MESSAGE}
                    />
                </Field>
                <Field>
                    <Label htmlFor="token">API token</Label>
                    <Input
                        id="token"
                        name="token"
                        defaultValue={token}
                        pattern={GITHUB_TOKEN_PATTERN}
                        title={GITHUB_TOKEN_VALIDATION_MESSAGE}
                    />
                </Field>
                <Field
                    css={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                >
                    {state.isDirty && <Button type="reset">Reset</Button>}
                    {!state.isSaved && (
                        <Button
                            css={{ marginLeft: '0.5rem' }}
                            type="submit"
                            primary
                        >
                            Save
                        </Button>
                    )}
                    {state.isSaved && (
                        <Succcess>
                            <Checkmark /> Saved!
                        </Succcess>
                    )}
                </Field>
            </Form>
        </section>
    );
};

const Succcess = styled.span`
    color: rgb(3, 129, 83);
`;
