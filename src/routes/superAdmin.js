import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

const Admin = React.lazy(() => import('../Admins/'));
const FormAdmin = React.lazy(() => import('../Admins/Form/index'));

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

const superAdmin = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/superAdmin/admin`} component={Admin} />
        <Route exact path={`${url}/superAdmin/admin/form/:id?`} component={FormAdmin} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default superAdmin;
