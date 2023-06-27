import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';

import Members from 'Components/Members';
import MembersForm from 'Components/Members/Form/MembersForm';
import Trainers from 'Components/Trainers';
import FormTrainer from 'Components/Trainers/FormTrainers';
import Classes from 'Components/Classes';
import FormClasses from 'Components/Classes/Form';
import AdminProfile from 'Components/Users/Admin/profile';
import AdminSubscriptions from 'Components/Users/Admin/subscriptions';
import FormSubscription from 'Components/Subscriptions/FormSubscription/Index';
import Activities from 'Components/Activities/';
import ModalAddActivity from 'Components/Activities/FormActivities';

const routes = [
  {
    name: 'Classes',
    path: '/admin/classes',
    icon: 'class.png'
  },
  {
    name: 'Members',
    path: '/admin/members',
    icon: 'member.png'
  },
  {
    name: 'Trainers',
    path: '/admin/trainers',
    icon: 'trainer.png'
  },
  {
    name: 'Activities',
    path: '/admin/activities',
    icon: 'runner.png'
  },
  {
    name: 'Subscription',
    path: '/admin/subscription',
    icon: 'suscription.png'
  },
  {
    name: 'Profile',
    path: '/admin/profile',
    icon: 'admin.png'
  }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Classes} />
        <Route exact path={`${url}/classes`} component={Classes} />
        <Route exact path={`${url}/classes/ClassForm/:id?`} component={FormClasses} />
        <Route exact path={`${url}/trainers`} component={Trainers} />
        <Route path={`${url}/trainers/form/:id?`} component={FormTrainer} />
        <Route exact path={`${url}/members`} component={Members} />
        <Route path={`${url}/members/form/:id?`} component={MembersForm} />
        <Route exact path={`${url}/profile`} component={AdminProfile} />
        <Route exact path={`${url}/subscription`} component={AdminSubscriptions} />
        <Route path={`${url}/subscriptions/form/:id?`} component={FormSubscription} />
        <Route exact path={`${url}/activities`} component={Activities} />
        <Route path={`${url}/activities/form/:id?`} component={ModalAddActivity} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;