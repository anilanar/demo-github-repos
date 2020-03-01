import React from 'react';
import { ComponentType } from 'react';
import { useSelector } from 'react-redux';

import { getLocation } from '../selectors';
import { NotFound } from './NotFound';
import { RouteName } from './types';

interface RouterProps {
    pageMap: { [K in RouteName]: ComponentType<{}> | undefined };
}
export const Router = ({ pageMap }: RouterProps): JSX.Element => {
    const { type } = useSelector(getLocation);
    const Page =
        (pageMap as Record<string, ComponentType<{}> | undefined>)[type] ??
        NotFound;
    return <Page />;
};
