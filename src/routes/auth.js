import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import SignForm from '../Components/Auth/SignUp';
import LoginForm from 'Components/Auth/Login';
import RecoverPassword from 'Components/Auth/RecoverPassword';
import Home from 'Components/Home';

const routes = [
  {
    name: 'Home',
    path: '/auth',
    icon: 'HomeB.png'
  },
  {
    name: 'Login',
    path: '/auth/login',
    icon: 'login.png'
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up',
    icon: 'sign-up.png'
  }
];

const AuthRoute = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/login`} component={LoginForm} />
        <Route exact path={`${url}/sign-up`} component={SignForm} />
        <Route exact path={`${url}/recover-password`} component={RecoverPassword} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
