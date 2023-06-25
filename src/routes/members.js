import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

const MemberActivities = React.lazy(() => import('../Users/Member/activities'));
const MemberClasses = React.lazy(() => import('../Users/Member/classes'));
const MemberProfile = React.lazy(() => import('../Users/Member/profile'));

const routes = [
  {
    name: 'Classes',
    path: '/member/classes'
  },
  {
    name: 'Activities',
    path: '/member/activities'
  },
  {
    name: 'Profile',
    path: '/member/profile'
  },
  {
    name: 'Log Out',
    path: '/'
  }
];

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/member/classes`} component={MemberClasses} />
        <Route exact path={`${url}/member/activities`} component={MemberActivities} />
        <Route exact path={`${url}/member/profile`} component={MemberProfile} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default MemberRoutes;
