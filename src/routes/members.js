import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import MemberActivities from 'Components/Users/Member/activities';
import MemberClasses from 'Components/Users/Member/classes';
import MemberProfile from 'Components/Users/Member/profile';
import MemberProfileForm from 'Components/Users/Member/profile/Form';
import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Classes',
    path: '/member/classes',
    icon: 'calendar.svg'
  },
  {
    name: 'Activities',
    path: '/member/activities',
    icon: 'activities.svg'
  },
  {
    name: 'Profile',
    path: '/member/profile',
    icon: 'profile.svg'
  }
];

const MemberRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/classes`} component={MemberClasses} />
        <Route exact path={`${url}/activities`} component={MemberActivities} />
        <Route exact path={`${url}/profile`} component={MemberProfile} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Route path={`${url}/profile/form/:id?`} component={MemberProfileForm} />
        <Redirect to={`${url}/classes`} />
      </Switch>
    </Layout>
  );
};

export default MemberRoutes;
