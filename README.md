
# This is a calendar component app with cypress testing

In this app I have implemented a simple calendar component with the ability to update the state of the calendar for the purpose of using cypress testing framework.

## Once you have downloaded the app make sure to install all dependencies by running

### npm i

Link React Docs: <https://create-react-app.dev/docs/adding-typescript/>

## Tests

- tests are located in the cypress/e2e/spec.cy.ts

### How to run tests?

1. launch the app

- open terminal

- go to the root folder of the app in your terminal

- enter the command > npm run start

2. Run cypress.

- open a second terminal

- make sure you are in the app root folder

- enter the command > npm run cypress:open

- a window will appear - click on E2E Testing

- select a browser of your choice (chrome)

- click Start E2E Testing

- click on spec.cy.ts

link to cypress docs: <https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#What-you-ll-learn>

# The Calendar App

The calendar is located in src/calendar

The app follows a form of MVC pattern where the logic comes from the useCalendar hook and Rendering is done by a dumbed down Calendar.tsx.

## useCalendar

use Calendar takes and string of ISO date ie '2022-11-11'

#### and returns several states

- monthName: string;

- year: number;

- daysOfWeek: cDayOfWeek[];

- weeks: cCalendarWeek[];

- currentDate: number | null;

#### and several functions to update the calendar state

- updateDate: ({ date, active }: cUseCalendarProps) => void;

- updateCurrentDate: (newDate: number | null) => void;

- updateMonth: (increment: number) => void;

- updateYear: (increment: number) => void;

#### The "types" are located in useCalendar.ts  and dateTypes.ts

## Calendar

Calendar.jsx uses the information from the useCalendar hook and displays the data in a meaningful way with an interactive UI for updating the calendar app state .

There are 2 more components in Calendar.jsx

- Row
  - Takes daysOfWeek and weeks
  - renders a row of cells ie Mo, Tu, Wed of 1,2,3,4
  
- Cell
  - Takes object with value
  - renders the value
  - has the event listener to update current date
  - has the logic for highlighting active cell
