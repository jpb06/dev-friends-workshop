# Workshop

![Code quality](https://img.shields.io/codefactor/grade/github/jpb06/workshop-react-front?logo=codefactor)
![Coverage](./badges/coverage-global%20coverage.svg)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/workshop-react-front/checks?label=last%20workflow&logo=github-actions)
![Last deployment](https://img.shields.io/github/deployments/jpb06/workshop-react-front/workshop-react-front?label=last%20deployment&logo=heroku)
![Last commit](https://img.shields.io/github/last-commit/jpb06/workshop-react-front?logo=git)
![Commits activity](https://img.shields.io/github/commit-activity/m/jpb06/workshop-react-front?logo=github)

Here is a little workshop to help my team move forward with our frontend :sparkles:

This is a continuation of the [Workshop react FCs repo](https://github.com/jpb06/workshop-react-fcs). Take a look at this archived repo if you want to know more about old implementations like the ones based on redux, for example.

You can find the [deployed app here](https://workshop-react-front.herokuapp.com).

## :zap: What is this repo about?

The original repo was created to convince everyone about React 16.8 features: hooks. Using only function components and hook is just great! Then the subject shifted to redux ...
But wait there is more! Now it's time to say good bye to redux and its ecosystem for asynchronous tasks (thunks, sagas, whatever floats your boat).

You will find a few branches on [the original repo](https://github.com/jpb06/workshop-react-fcs); from oldest to newest:

| Branch                                                                           | Description                                                                                                   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| :x: [noredux](https://github.com/jpb06/workshop-react-fcs/tree/noredux)          | Bearbone comparison between class components and FCs/hooks, using CRA                                         |
| :x: [redux](https://github.com/jpb06/workshop-react-fcs/tree/redux)              | Adding redux & redux-thunk to the mix. Still using CRA                                                        |
| :x: [react-query](https://github.com/jpb06/workshop-react-fcs/tree/react-query/) | No more redux. Time for server state libraries! Using nextjs this time and making sure we reach 100% coverage |

The current repo is an import of the react-query branch. We splitted frontend and backend in two different repos to tackle deployment issues.

## :zap: Guidelines

- :trumpet: The simpler the better: simple units of code are easier to understand and reason with, thus easier to maintain.
- :trumpet: Small units of code: by making sure they fit into our screen, we lowkey enforce a code splitting strategy.
- :trumpet: Do one thing. Do it well: pretty mundane SOLID principle here.

With these in mind, our unit & integration tests will be much easier to write :thumbsup:

## :zap: Dependencies

| Package                          | Description              | Documentation                                      |
| -------------------------------- | ------------------------ | -------------------------------------------------- |
| ⚛️ React                         | front library            | https://reactjs.org/docs/getting-started.html      |
| ⚛️ nextjs                        | react framework          | https://nextjs.org/docs/getting-started            |
| :heartpulse: typescript          | JS superset              | https://www.typescriptlang.org/docs/               |
| :iphone: Material UI             | UI framework             | https://material-ui.com/                           |
| :satellite: Axios                | HTTP client library      | https://github.com/axios/axios                     |
| :dizzy: react-query              | server state             | https://react-query.tanstack.com/overview          |
| :pencil2: eslint                 | linter                   | https://eslint.org/docs/user-guide/getting-started |
| :straight_ruler: prettier        | formatter                | https://prettier.io/docs/en/index.html             |
| :arrow_right_hook: husky         | git hooks                | https://typicode.github.io/husky/#/                |
| :boom: Jest                      | Testing framework        | https://jestjs.io/docs/en/getting-started          |
| 🧪 Testing library               | frontend testing library | https://testing-library.com/docs/                  |
| 🧪 Testing library - react hooks | react hooks testing      | https://react-hooks-testing-library.com/           |
| :wrench: msw                     | XHRs interceptor         | https://mswjs.io/docs/                             |

## :zap: Backend

You can find the backend repo [here](https://github.com/jpb06/workshop-react-backend). It's a barebone express, so not much to see there.

Let's just list quickly the routes exposed by the backend:

| Route           | Verb | Description                                                             |
| --------------- | ---- | ----------------------------------------------------------------------- |
| /squads         | GET  | Retrieves squads                                                        |
| /devs           | GET  | Retrieves devs                                                          |
| /devsby         | POST | Retrieves devs belonging to a list of squads passed in the request body |
| /changeDevSquad | POST | Moves a developer to another squad                                      |

## :zap: Components

This app is made of one epic: my dev friends. The epic contains a list of squads. Developers are displayed depending on the selected squads. A modal is also used to change the squad of a developer.
Here is a schema of how they interact with one another:

And Here is a quick description of the main components:

| Component        | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| MyDevFriends     | Epic root. Aggregates all components. An integration test was made for it (.spec file) |
| ChangeSquadModal | Modal to change the squad of developer.                                                |
| SquadFilter      | Displays a list of checkboxes to select squads                                         |
| DevsList         | Displays the developers belonging to the selected squads                               |
| StatusReport     | Making sure we give a feedback to the user if the app is busy                          |

There is a few generic components as well:

| Generic component      | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| BlockingError          | Providing a feedback to the user if something went wrong                 |
| CircularLoading        | Displaying a circular loader                                             |
| DownTransition         | A transition for the modal                                               |
| GlobalLoadingIndicator | A linear loading indicator showing up everyime a XHR call is in progress |
| LinearLoading          | Base linear loading indicator                                            |
| PageLayout             | The main layout of the front                                             |
