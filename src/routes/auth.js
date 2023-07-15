import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import SignForm from '../Components/Auth/SignUp';
import LoginForm from 'Components/Auth/Login';
import RecoverPassword from 'Components/Auth/RecoverPassword';
import Home from 'Components/Home';
import { useEffect, useState } from 'react';

const routes = [
  {
    name: 'Home',
    path: '/auth/home',
    icon: 'newhome.svg'
  },
  {
    name: 'Login',
    path: '/auth/login',
    icon: 'login.svg'
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up',
    icon: 'signup.svg'
  }
];

const AuthRoute = () => {
  const [roleRoutes, setRoleRoutes] = useState(null);
  const role = sessionStorage.getItem('role');
  useEffect(() => {
    if (role) {
      switch (role) {
        case 'ADMIN': {
          setRoleRoutes([
            {
              name: 'Classes',
              path: '/admin/classes',
              icon: 'calendar.svg'
            },
            {
              name: 'Members',
              path: '/admin/members',
              icon: 'member.svg'
            },
            {
              name: 'Trainers',
              path: '/admin/trainers',
              icon: 'trainers.png'
            },
            {
              name: 'Activities',
              path: '/admin/activities',
              icon: 'activities.svg'
            },
            {
              name: 'Subscription',
              path: '/admin/subscription',
              icon: 'journal-bookmark.svg'
            },
            {
              name: 'Profile',
              path: '/admin/profile',
              icon: 'profile.svg'
            }
          ]);
          break;
        }
        case 'MEMBER': {
          setRoleRoutes([
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
          ]);
          break;
        }
        case 'TRAINER': {
          setRoleRoutes([
            {
              name: 'Classes',
              path: '/trainer/classes',
              icon: 'calendar.svg'
            },
            {
              name: 'Profile',
              path: '/trainer/profile',
              icon: 'profile.svg'
            }
          ]);
          break;
        }
        case 'SUPER_ADMIN': {
          setRoleRoutes([
            {
              name: 'Admin',
              path: '/superAdmin/admin',
              icon: 'member.svg'
            }
          ]);
          break;
        }
        default:
          break;
      }
    } else {
      setRoleRoutes(null);
    }
  }, [role]);

  const { url } = useRouteMatch();
  return (
    <Layout routes={roleRoutes === null ? routes : roleRoutes}>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/login`} component={LoginForm} />
        <Route exact path={`${url}/sign-up`} component={SignForm} />
        <Route exact path={`${url}/recover-password`} component={RecoverPassword} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
