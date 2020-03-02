# To run the app

```sh
> yarn
> yarn start
```

# To run cypress tests

```
> yarn cypress open
```

or

```
> yarn cypress run
```

# Notes

-   Exclusively used uncontrolled forms. Blog post coming soon to compare uncontrolled/controlled and about compile time safety of form inputs and outputs (on why we may not need them).
-   Used `redux-query` to abstract request lifecycles as much as possible. I would have preferred GraphQL over redux any day (reasons below).
-   Setting username and API token to overcome Github's API rate limits. 60 without api token, 5000 with API token. Settings are stored in local storage.
-   No pagination yet. It just displays first 30 results.
-   Didn't have time to invent a new component library.

# Some opinions

This app demonstrates (to some degree) some of my opinions on how modern react apps should be structured (in under 3 hours).

-   Most of the structure is copy paste from my boilerplates.
-   Use Redux as little as possible, limiting it to emitting of global events instead of handling every effectful interaction. Redux has trouble with modularization/localization of effects, cleaning up of resources and of multi-step transaction-like operations that requires multiple participant actors. For such cases, using React components as runtime containers create a cleaner architecture.
-   Request start/loading/success/failure cycles should not be managed by userland. Normalization must be abstracted away too. In the community, the best take at that approach is currently GraphQL libraries. Apollo is ok, but too bloated today. formidablelabs/urql is a very good one. It allows hiding implementation details such as normalization, (most of) caching and memoized selectors. However, it currently lacks a local state solution. `redux-query` is close, but normalization and selectors are not abstracted enough. Trying to share global selectors across components seems to be a premature optimization nowadays, with the introduction of `useMemo` (more granular memoizations, no need to create components just to memoize something).
-   Almost every external data should be validated by a codec. GraphQL also has payload validation based on schema. I've been using `io-ts` since 2 years and I can't count number of headaches it saved me.
-   `throw` should never be should. `Either` is a nice way to propogate typeful errors, with some learning curve. Being able to propogate error types is very useful. If you have an application with a lot of side effects and a lot of chance of failing, `Either` is a must. Relying on error propogation through the stack of through Promises is suicide.
-   Typescript has 2 very important unsafe parts: index accesses on records (objects) and arrays. If you enjoy `fp-ts`, one can use `fp-ts` functions while querying/manipulating them. Another option is to roll your own solution if you don't prefer to use `Option`.
-   If starting a good project, `Option` will save you a lot of lines of code, with some learning curve. `O.map`, `O.chain`, `O.filter` will come naturally, however `Alt`, `Applicative`, `Apply` instances require some learning curve.
-   Hooks aren't perfect. Not being able to run them conditionally is the biggest drawback. But it's the best tool we have right now. `react-use` is very useful, allows many traps to be avoided. Especially for cleaning up of resources.
-   I've been using `deox` for typesafe actions and reducers. It has few minor incompabilities with other libraries (such as React's `useReducer`, both requiring a default state).
-   css-in-js is the way to go. It's the only way to cope with and reason about styles of an application. Verification of styles against business requirements in a relatively fast way is still an unsolved problem. Closest it gets is image snapshots in storybooks.
-   Cypress is satisfying, much better than Selenium in terms of dev-experience.
-   Frontend community, following in JS celebrities' path, still believes that unit tests are no good. I highly disagree, and this repo lacking them is due to a race to completion.
-   I can't recommend `eslint-plugin-simple-import-sort` enough. Just use it.
-   tbc...
