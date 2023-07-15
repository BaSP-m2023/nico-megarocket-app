import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Admin from 'Components/Admins/';
import FormAdmin from 'Components/Admins/Form';
import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Admin',
    path: '/superAdmin/admin',
    icon: 'member.svg'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/admin`} component={Admin} />
        <Route path={`${url}/admin/form/:id?`} component={FormAdmin} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;
