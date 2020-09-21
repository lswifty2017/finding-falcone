## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Design Decisions and Dependencies

This project was developed with a functional approach, avoiding mutation as much as possible with the use of pure, stateless functions. Global state is handled with React hooks in App.js, with a Lodash library being used for its deepClone function to ensure this state does not get mutated by accident.

Testing of components was configured using Jest testing framework, in which each component is tested either via function or UI snapshots. Full tests have been completed for the API and Time Tracker components, however, tests for the Destination Cards and the App integration tests have been written as 'to do' tests, and respresent what tests would be conducted given more time. There was difficulty in creating tests for the React Select components, as they do not seem to be compatible with the standard JEST event fires.

The project is linted with Prettier, and has a configuration file configured for VS Code IDE.

## Future Considerations

Currently the state is only managed as an object, however, this is would be easily subject to mutation given scale of the project. A state management solution such as Redux would help create immutable state going forward. This would also help de-couple the destination cards from the main App container.

Time would also be worth spent de-coupling the planet and vehicle select elements of the destination card into individual components (e.g. a Select Component) for future expansion. Error logging is also something that could be improved on, with perhaps more appropriate error handling given the error.
