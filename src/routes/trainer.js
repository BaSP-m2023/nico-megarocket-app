import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import TrainerProfile from 'Components/Users/Trainer/profile';
import TrainersClasses from 'Components/Users/Trainer/classes';

const routes = [
  {
    name: 'Classes',
    path: '/trainers/classes'
  },
  {
    name: 'Profile',
    path: '/trainers/profile'
  },
  {
    name: 'Log Out',
    path: '/'
  }
];

const TrainerRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/trainers/classes`} component={TrainersClasses} />
        <Route exact path={`${url}/trainers/profile`} component={TrainerProfile} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default TrainerRoutes;
