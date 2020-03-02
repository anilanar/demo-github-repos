/* eslint-disable @typescript-eslint/camelcase */

export {};

describe('Github search', () => {
    it('shows a hint to search by username', () => {
        cy.visit('http://localhost:3000');
        cy.get('output > ul').should(
            'contain.text',
            'Type a username and search.',
        );
    });
    it('shows user repositories', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://api.github.com/users/*/repos',
            response: [
                {
                    id: '1',
                    name: 'foo',
                    description: 'foodesc',
                    html_url: 'https://github.com/foo/foo',
                    full_name: 'foo/foo',
                },
                {
                    id: '1',
                    name: 'bar',
                    description: 'bardesc',
                    html_url: 'https://github.com/bar/bar',
                    full_name: 'bar/bar',
                },
            ],
        }).as('req');

        cy.visit('http://localhost:3000');
        cy.get('input[name=username]').type('anilanar');
        cy.get('form').submit();
        cy.get('output > ul > li').should('have.length', 2);
    });
    it('shows loading, then the result', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://api.github.com/users/*/repos',
            response: [],
            delay: 1000,
        }).as('req');
        cy.visit('http://localhost:3000');
        cy.get('input[name=username]').type('anilanar');
        cy.get('form').submit();
        cy.get('output > ul').should('contain.text', 'Loading');
        cy.wait('@req');
        cy.get('output > ul').should('contain.text', 'No repositories found.');
    });
    it('loads repositories by username given the query param', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://api.github.com/users/*/repos',
            response: [],
        }).as('req');
        cy.visit('http://localhost:3000?u=anilanar');
        cy.wait('@req').then(xhr => {
            expect(xhr.url).to.eq(
                'https://api.github.com/users/anilanar/repos',
            );
        });
    });
    it('clears list upon empty submit', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://api.github.com/users/*/repos',
            response: [
                {
                    id: '1',
                    name: 'foo',
                    description: 'foodesc',
                    html_url: 'https://github.com/foo/foo',
                    full_name: 'foo/foo',
                },
                {
                    id: '1',
                    name: 'bar',
                    description: 'bardesc',
                    html_url: 'https://github.com/bar/bar',
                    full_name: 'bar/bar',
                },
            ],
        }).as('req');

        cy.visit('http://localhost:3000?u=anilanar');
        cy.wait('@req');
        cy.get('input[name=username]').clear();
        cy.get('form').submit();
        cy.get('output > ul').should(
            'contain.text',
            'Type a username and search.',
        );
    });
    it('navigates to settings', () => {
        cy.visit('http://localhost:3000');
        cy.get('a[href="/settings"]').click();
        cy.url().should('equal', 'http://localhost:3000/settings');
    });
    it('makes request with basic auth using settings from local storage', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://api.github.com/users/*/repos',
            response: [],
        }).as('req');
        cy.visit('http://localhost:3000');
        localStorage.setItem(
            'github:settings',
            JSON.stringify({
                username: 'anilanar',
                token: 'foobarfoobar1234567896451519cffc7a21a4da',
            }),
        );
        cy.reload();
        cy.get('input[name=username]').type('foobar');
        cy.get('form').submit();
        cy.wait('@req').then(xhr => {
            expect(
                atob(xhr.requestHeaders['Authorization'].split(' ')[1]),
            ).to.eq('anilanar:foobarfoobar1234567896451519cffc7a21a4da');
        });
    });
    it('displays no results found msg if empty array is returned', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'https://api.github.com/users/*/repos',
            response: [],
        }).as('req');
        cy.visit('http://localhost:3000');
        cy.get('input[name=username]').type('foobar');
        cy.get('form').submit();
        cy.get('output > ul').should('contain.text', 'No repositories found.');
    });
});

describe('Github settings', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/settings');
    });

    it('saves settings', () => {
        cy.get('input[name=username]').type('anilanar');
        cy.get('input[name=token]').type(
            'foobarfoobar1234567896451519cffc7a21a4da',
        );
        cy.get('form').submit();
        cy.reload();
        cy.get('input[name=username]').should('have.value', 'anilanar');
        cy.get('input[name=token]').should(
            'have.value',
            'foobarfoobar1234567896451519cffc7a21a4da',
        );
    });

    it('restores settings from local storage', () => {
        localStorage.setItem(
            'github:settings',
            JSON.stringify({
                username: 'anilanar',
                token: 'foobarfoobar1234567896451519cffc7a21a4da',
            }),
        );
        cy.reload();
        cy.get('input[name=username]').should('have.value', 'anilanar');
        cy.get('input[name=token]').should(
            'have.value',
            'foobarfoobar1234567896451519cffc7a21a4da',
        );
    });

    it('resets form to saved settings', () => {
        localStorage.setItem(
            'github:settings',
            JSON.stringify({
                username: 'anilanar',
                token: 'foobarfoobar1234567896451519cffc7a21a4da',
            }),
        );
        cy.reload();
        cy.get('input[name=username]').clear();
        cy.get('input[name=token]').clear();
        cy.get('button[type=reset]').click();
        cy.get('input[name=username]').should('have.value', 'anilanar');
        cy.get('input[name=token]').should(
            'have.value',
            'foobarfoobar1234567896451519cffc7a21a4da',
        );
    });

    it('displays success msg instead of save button after save', () => {
        cy.visit('http://localhost:3000/settings');
        cy.get('input[name=username]').type('anilanar');
        cy.get('input[name=token]').type(
            'foobarfoobar1234567896451519cffc7a21a4da',
        );
        cy.get('form').submit();
        cy.get('form').should('contain.text', 'Saved!');
        cy.get('button[type=submit]').should('not.exist');
    });

    it('hides reset button after save', () => {
        cy.visit('http://localhost:3000/settings');
        cy.get('input[name=username]').type('anilanar');
        cy.get('input[name=token]').type(
            'foobarfoobar1234567896451519cffc7a21a4da',
        );
        cy.get('form').submit();
        cy.get('button[type=reset]').should('not.exist');
    });

    it('displays validation msg for invalid token', () => {
        cy.visit('http://localhost:3000/settings');
        cy.get('input[name=token]').type('foobar');
        cy.get('form').submit();
        cy.get('input[name=token]').then($input => {
            expect(
                ($input[0] as HTMLInputElement).validationMessage,
            ).to.contain(
                'Invalid token format, please make sure you copied the correct key.',
            );
        });
    });

    it('does not display reset button when untouched', () => {
        cy.visit('http://localhost:3000/settings');
        cy.get('button[type=reset]').should('not.exist');
    });

    it('displays reset button when touched', () => {
        cy.visit('http://localhost:3000/settings');
        cy.get('input[name=username]').type('foo');
        cy.get('button[type=reset]').should('exist');
    });

    it('navigates home', () => {
        cy.visit('http://localhost:3000/settings');
        cy.get('a[href="/"]').click();
        cy.url().should('equal', 'http://localhost:3000/');
    });
});
