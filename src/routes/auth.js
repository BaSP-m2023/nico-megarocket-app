import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import SignForm from '../Components/Auth/SignUp/index';
import LoginForm from 'Components/Auth/Login';
import NotAllowed from 'Components/Auth/NotAllowed';
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
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
