import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';

const SuperAdminRoutes = '';
const AdminRoutes = React.lazy(() => import('./admin'));
const TrainerRoutes = '';
const MemberRoutes = '';
const AuthRoute = React.lazy(() => import('./auth'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Switch>
          <PrivateRoute path="/super-admin" role="SUPER_ADMIN" component={SuperAdminRoutes} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
          <PrivateRoute path="/member" role="MEMBER" component={MemberRoutes} />
          <PrivateRoute path="/trainer" role="TRAINER" component={TrainerRoutes} />
          <Route path="/auth" component={AuthRoute} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
