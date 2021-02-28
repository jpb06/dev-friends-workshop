# Workshop

Here is a little workshop to help my team move forward with our frontend.

## What is this repo about?

Orginally, this repo was created to convince everyone about React 16.8 features: hooks. Using only function components and hook is just great! Then the subject shifted to redux ...
But wait there is more! Now it's time to say good bye to redux and its ecosystem for asynchronous tasks (thunks, sagas, whatever floats your boat).

You will find a few branches on this repo: from oldest to newest:

| Branch      | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| noredux     | Bearbone comparison between class components and FCs/hooks, using CRA                                         |
| redux       | Adding redux & redux-thunk to the mix. Still using CRA                                                        |
| react-query | No more redux. Time for server state libraries! Using nextjs this time and making sure we reach 100% coverage |

## Components

This app is made of one epic: my dev friend. The epic contains a list of squads. Developers are displayed depending on the selected squads. A modal is also used to change the squad of a developer.
Here is a schema of how they interact with one another:

![My dev friends](./misc/MyDevsFriends.jpg)

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

![My dev friends UI](./misc/MyDevsFriends-UI.jpg)
