import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import MemberActivities from 'Components/Users/Member/activities';
import MemberClasses from 'Components/Users/Member/classes';
import MemberProfile from 'Components/Users/Member/profile';

const routes = [
  {
    name: 'Classes',
    path: '/member/classes',
    icon: 'class.png'
  },
  {
    name: 'Activities',
    path: '/member/activities',
    icon: 'runner.png'
  },
  {
    name: 'Profile',
    path: '/member/profile',
    icon: 'member.png'
  }
];

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={MemberClasses} />
        <Route exact path={`${url}/classes`} component={MemberClasses} />
        <Route exact path={`${url}/activities`} component={MemberActivities} />
        <Route exact path={`${url}/profile`} component={MemberProfile} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default MemberRoutes;
