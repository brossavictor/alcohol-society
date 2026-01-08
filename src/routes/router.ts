import { createBrowserRouter } from 'react-router';

import App from 'src/App';
import { Template } from 'src/components/Template';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'red_wine',
        Component: Template,
      },
      {
        path: 'white_wine',
        Component: Template,
      },
      {
        path: 'sparkling_wine',
        Component: Template,
      },
      {
        path: 'cream',
        Component: Template,
      },
      {
        path: 'whisky',
        Component: Template,
      },
      {
        path: 'vodka',
        Component: Template,
      },
      {
        path: 'tequila',
        Component: Template,
      },
      {
        path: 'gin',
        Component: Template,
      },
    ],
  },
]);
