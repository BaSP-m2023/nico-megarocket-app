import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import TrainerProfile from 'Components/Users/Trainer/profile';
import TrainersClasses from 'Components/Users/Trainer/classes';
import TrainerProfileForm from 'Components/Users/Trainer/profile/Form';
import TableMember from 'Components/Users/Trainer/classes/TableMembers/';
import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Classes',
    path: '/trainer/classes',
    icon: 'class.png'
  },
  {
    name: 'Profile',
    path: '/trainer/profile',
    icon: 'member.png'
  }
];

const TrainerRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/classes/`} component={TrainersClasses} />
        <Route exact path={`${url}/classes/members`} component={TableMember} />
        <Route exact path={`${url}/profile`} component={TrainerProfile} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Route path={`${url}/profile/form/:id?`} component={TrainerProfileForm} />
        <Redirect to={`${url}/classes`} />
      </Switch>
    </Layout>
  );
};

export default TrainerRoutes;
