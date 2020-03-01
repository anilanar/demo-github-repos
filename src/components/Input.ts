import styled from '@emotion/styled/macro';

export const Input = styled.input<{ inline?: boolean }>`
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 12px 20px;
    outline: none;
    width: ${({ inline }) => (inline ? 'auto' : '100%')};
    margin-top: ${({ inline }) => (inline ? '0' : '0.5rem')};

    &:invalid {
        border-color: red;
    }

    &:invalid:focus {
        outline: none;
    }

    &::placeholder {
        color: #777;
    }

    &:empty {
        caret-color: #777;
    }
`;
