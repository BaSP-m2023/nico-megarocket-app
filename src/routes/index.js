import React, { Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { getAuth } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'helper/firebase';

const SuperAdminRoutes = React.lazy(() => import('./superAdmin'));
const AdminRoutes = React.lazy(() => import('./admin'));
const TrainerRoutes = React.lazy(() => import('./trainer'));
const MemberRoutes = React.lazy(() => import('./members'));
const AuthRoute = React.lazy(() => import('./auth'));

const dispatch = useDispatch();
const token = sessionStorage.getItem('token');

useEffect(() => {
  tokenListener();
}, []);

useEffect(() => {
  if (token) {
    dispatch(getAuth(token));
  }
}, [token]);

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
