import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import LoginForm from 'Components/Auth/Login';
import NotAllowed from 'Components/Auth/NotAllowed';
import Home from 'Components/Home';

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Login',
    path: '/auth/login'
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up'
  }
];

const AuthRoute = () => {
  const { url } = useRouteMatch();
  let SignUp;
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
        <Route path={`${url}/login`} component={LoginForm} />
        <Route path={`${url}/sign-up`} component={SignUp} />
        <Route path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
