# Workshop

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/workshop-react-front)
[![Front deployment](https://img.shields.io/github/deployments/jpb06/workshop-react-front/production?label=front%20deploy&logo=vercel&logoColor=white)](https://workshop-react-front.vercel.app/front)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/workshop-react-front/tests%20and%20sonarcloud%20scan?label=last%20workflow&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
![Coverage](./badges/coverage-jest%20coverage.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_workshop-react-front&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jpb06_workshop-react-front)
![Last commit](https://img.shields.io/github/last-commit/jpb06/workshop-react-front?logo=git)

Here is a little workshop to help my team move forward with our frontend :sparkles:

This is a continuation of the [Workshop react FCs repo](https://github.com/jpb06/workshop-react-fcs). Take a look at this archived repo if you want to know more about old implementations like the ones based on redux, for example.

You can find the [deployed app here](https://workshop-react-front.vercel.app).

## ⚡ What is this repo about?

The original repo was created to convince everyone about React 16.8 features: hooks. Using only function components and hook is just great! Then the subject shifted to redux. Let's just say good bye to redux and its ecosystem for asynchronous tasks (thunks, sagas, whatever floats your boat).

You will find a few branches on [the original repo](https://github.com/jpb06/workshop-react-fcs); from oldest to newest:

| Branch                                                                          | Description                                                                                                   |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ❌ [noredux](https://github.com/jpb06/workshop-react-fcs/tree/noredux)          | Bearbone comparison between class components and FCs/hooks, using CRA                                         |
| ❌ [redux](https://github.com/jpb06/workshop-react-fcs/tree/redux)              | Adding redux & redux-thunk to the mix. Still using CRA                                                        |
| ❌ [react-query](https://github.com/jpb06/workshop-react-fcs/tree/react-query/) | No more redux. Time for server state libraries! Using nextjs this time and making sure we reach 100% coverage |

The current repo is an import of the react-query branch. We splitted frontend and backend in two different repos to tackle deployment issues.

## ⚡ Guidelines

### 🔶 [General guidelines](./docs/bp-general-guidelines.md)

### 🔶 [Making sure we are understood](./docs/bp-conveyintent-guidelines.md)

### 🔶 [Code guidelines](./docs/bp-code-guidelines.md)

### 🔶 [Frontend guidelines](./docs/bp-frontend-guidelines.md)

## ⚡ The Dev Friends application

Our objective here is to display a list of developers that can be filtered by their squad. We also want to be able to change the squad of a developer.

We will follow the guidelines described above. Let's take a look at the components tree of the app:

![Components tree](./docs/assets/DevFriendsTree.png)

## ⚡ Backend

You can find the backend repo [here](https://github.com/jpb06/workshop-react-backend). It's a barebone express, so not much to see there.

Let's just list quickly the routes exposed by the backend:

| Route           | Verb | Description                                                             |
| --------------- | ---- | ----------------------------------------------------------------------- |
| /squads         | GET  | Retrieves squads                                                        |
| /devs           | GET  | Retrieves devs                                                          |
| /devsby         | POST | Retrieves devs belonging to a list of squads passed in the request body |
| /changeDevSquad | POST | Moves a developer to another squad                                      |

## ⚡ Dependencies

| Package                          | Description              | Documentation                                        |
| -------------------------------- | ------------------------ | ---------------------------------------------------- |
| ⚛️ React                         | front library            | <https://reactjs.org/docs/getting-started.html>      |
| ⚛️ nextjs                        | react framework          | <https://nextjs.org/docs/getting-started>            |
| :heartpulse: typescript          | JS superset              | <https://www.typescriptlang.org/docs/>               |
| :iphone: Material UI             | UI framework             | <https://material-ui.com/>                           |
| :satellite: Axios                | HTTP client library      | <https://github.com/axios/axios>                     |
| :dizzy: react-query              | server state             | <https://react-query.tanstack.com/overview>          |
| :pencil2: eslint                 | linter                   | <https://eslint.org/docs/user-guide/getting-started> |
| :straight_ruler: prettier        | formatter                | <https://prettier.io/docs/en/index.html>             |
| :arrow_right_hook: husky         | git hooks                | <https://typicode.github.io/husky/#/>                |
| :boom: Jest                      | Testing framework        | <https://jestjs.io/docs/en/getting-started>          |
| 🧪 Testing library               | frontend testing library | <https://testing-library.com/docs/>                  |
| 🧪 Testing library - react hooks | react hooks testing      | <https://react-hooks-testing-library.com/>           |
| :wrench: msw                     | XHRs interceptor         | <https://mswjs.io/docs/>                             |
