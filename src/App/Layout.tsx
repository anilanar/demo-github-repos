import styled from '@emotion/styled/macro';
import React from 'react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => (
    <FullWidth>
        <Centered>{children}</Centered>
    </FullWidth>
);

const FullWidth = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Centered = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 25rem;
    align-self: center;
`;
