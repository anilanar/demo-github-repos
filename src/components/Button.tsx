import css from '@emotion/css/macro';
import styled from '@emotion/styled/macro';

export const Button = styled.button<{ primary?: boolean }>`
    font-size: 0.9rem;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    text-align: center;
    font-weight: 400;
    height: 2.5rem;
    box-shadow: none;
    border-radius: 0.25rem;
    padding: 0 2rem;
    box-sizing: border-box;
    padding: 12px 20px;
    color: rgb(31, 115, 183);
    border-color: rgb(31, 115, 183);
    transition: border-color 0.25s ease-in-out 0s,
        box-shadow 0.1s ease-in-out 0s, background-color 0.25s ease-in-out 0s,
        color 0.25s ease-in-out 0s;

    &:hover {
        background-color: rgba(31, 115, 183, 0.08);
        color: rgb(20, 74, 117);
        border-color: rgb(20, 74, 117);
    }

    *:focus {
        outline: none;
    }

    ${({ primary }) =>
        primary &&
        css`
            border-color: transparent;
            color: white;
            background-color: rgb(31, 115, 183);

            &:hover {
                border-color: transparent;
                color: white;
                background-color: rgb(20, 74, 117);
            }
        `}
`;
