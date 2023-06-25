import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Admin from 'Components/Admins/';
import FormAdmin from 'Components/Admins/Form';

const routes = [
  {
    name: 'Admin',
    path: '/superAdmin/admin'
  },
  {
    name: 'Log Out',
    path: '/'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/superAdmin/admin`} component={Admin} />
        <Route path={`${url}/superAdmin/admin/form/:id?`} component={FormAdmin} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;
