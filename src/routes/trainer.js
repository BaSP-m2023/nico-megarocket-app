import React from 'react';
import Layout from 'Components/Layout';
import { Switch, /* Route */ Redirect, useRouteMatch } from 'react-router-dom';

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
        {/* <Route exact path={`${url}/member/classes`} component={MemberClasses} /> */}
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default TrainerRoutes;
