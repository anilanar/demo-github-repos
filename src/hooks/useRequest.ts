import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from 'react-use';
import { getQueryKey, QueryConfig } from 'redux-query';
import * as RQ from 'redux-query-react';

import { getErrorByKey } from '../selectors';

enum ResponseStatus {
    Initial,
    Pending,
    Success,
    Failure,
    EmptyResult,
}

export type Response<A> =
    | { status: ResponseStatus.Initial }
    | { status: ResponseStatus.Pending }
    | { status: ResponseStatus.Success; value: A }
    | { status: ResponseStatus.Failure; error: string }
    | { status: ResponseStatus.EmptyResult };

export const useRequest = <A>(
    config: QueryConfig<unknown> | null | undefined,
    selector: (state: never) => A | null,
): Response<A> => {
    const [req] = RQ.useRequest(config);

    const result = useSelector(
        req.isPending || req.isFinished ? selector : (): null => null,
    );
    const queryKey = config && getQueryKey(config);
    const error = useSelector(
        queryKey ? getErrorByKey(queryKey) : (): null => null,
    );
    const [response, setResponse] = useState<Response<A>>({
        status: ResponseStatus.Initial,
    });

    const [debouncedResponse, setDebouncedResponse] = useState(response);

    useDebounce(() => setDebouncedResponse(response), 100, [response]);

    useEffect(() => {
        if (req.isPending) {
            setResponse({ status: ResponseStatus.Pending });
        } else if (req.isFinished) {
            if (req.status && req.status >= 200 && req.status < 400) {
                if (
                    result === null ||
                    (Array.isArray(result) && result.length === 0)
                ) {
                    setResponse({ status: ResponseStatus.EmptyResult });
                } else {
                    setResponse({
                        status: ResponseStatus.Success,
                        value: result,
                    });
                }
            }
            if (error != null) {
                setResponse({ status: ResponseStatus.Failure, error });
            }
        } else {
            setResponse({ status: ResponseStatus.Initial });
        }
    }, [error, req.isFinished, req.isPending, req.status, result]);

    return debouncedResponse;
};

interface ResponseMatcher<A> {
    onSuccess: (a: A) => ReactNode;
    onPending: () => ReactNode;
    onFailure: (e: string) => ReactNode;
    onInitial: () => ReactNode;
    onEmpty: () => ReactNode;
}
export const matchResponse = <A>(
    res: Response<A>,
    { onFailure, onPending, onSuccess, onInitial, onEmpty }: ResponseMatcher<A>,
): ReactNode => {
    switch (res.status) {
        case ResponseStatus.Success:
            return onSuccess(res.value);
        case ResponseStatus.Pending:
            return onPending();
        case ResponseStatus.Failure:
            return onFailure(res.error);
        case ResponseStatus.Initial:
            return onInitial();
        case ResponseStatus.EmptyResult:
            return onEmpty();
    }
};
