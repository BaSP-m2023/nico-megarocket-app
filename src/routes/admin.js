import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';

import Members from 'Components/Members';
import MembersForm from 'Components/Members/Form/MembersForm';
import Trainers from 'Components/Trainers';
import FormTrainer from 'Components/Trainers/FormTrainers';
import Classes from 'Components/Classes';
import FormClasses from 'Components/Classes/Form';
import AdminProfile from 'Components/Users/Admin/profile';

const routes = [
  {
    name: 'Classes',
    path: '/admin/classes'
  },
  {
    name: 'Members',
    path: '/admin/members'
  },
  {
    name: 'Trainers',
    path: '/admin/trainers'
  },
  {
    name: 'Profile',
    path: '/admin/profile'
  }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/classes`} component={Classes} />
        <Route path={`${url}/classes/form/:id?`} component={FormClasses} />
        <Route exact path={`${url}/trainers`} component={Trainers} />
        <Route path={`${url}/trainers/form/:id?`} component={FormTrainer} />
        <Route exact path={`${url}/members`} component={Members} />
        <Route path={`${url}/members/form/:id?`} component={MembersForm} />
        <Route exact path={`${url}/admin/profile`} component={AdminProfile} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
