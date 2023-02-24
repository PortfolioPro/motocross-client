import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App';
import TeamsIndex, { teamsIndexLoader } from './views/teamsIndex';
import TeamsNew, { teamsNewAction } from './views/teamsNew';
import TeamShow, { teamShowLoader, teamDeleteAction } from './views/teamShow';
import TeamEdit, { teamEditLoader, teamEditAction } from './views/teamEdit';
import RidersNew, { ridersNewAction } from './views/ridersNew';
import RiderShow, { riderShowLoader, riderDeleteAction } from './views/riderShow';
import RiderEdit, { riderEditLoader, riderEditAction } from './views/riderEdit';
import ErrorBoundary from './views/errorBoundary';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <TeamsIndex />,
        loader: teamsIndexLoader
      },
      {
        path: 'teams',
        element: <TeamsIndex />,
        loader: teamsIndexLoader
      },
      {
        path: 'teams/new',
        element: <TeamsNew />,
        action: teamsNewAction
      },
      {
        path: 'teams/:id',
        element: <TeamShow />,
        loader: teamShowLoader,
        action: teamDeleteAction
      },
      {
        path: 'teams/:id/edit',
        element: <TeamEdit />,
        loader: teamEditLoader,
        action: teamEditAction
      },
      {
        path: 'teams/:teamId/riders/new',
        element: <RidersNew />,
        action: ridersNewAction
      },
      {
        path: 'teams/:teamId/riders/:id',
        element: <RiderShow />,
        loader: riderShowLoader,
        action: riderDeleteAction
      },
      {
        path: 'teams/:teamId/riders/:id/edit',
        element: <RiderEdit />,
        loader: riderEditLoader,
        action: riderEditAction
      },
      {
        path: '/*',
        element: <TeamsIndex />,
        loader: teamsIndexLoader
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
