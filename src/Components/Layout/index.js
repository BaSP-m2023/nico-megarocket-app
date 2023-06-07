import Admins from '../Admins/index';
import Classes from '../Classes';
import Members from '../Members';
import { MembersForm } from '../Members/Form/MembersForm';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';

import Trainers from '../Trainers';
import FormTrainer from '../Trainers/FormTrainers';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Activities from '../Activities';
import FormActivity from '../Activities/FormActivities';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import FormClasses from '../Classes/Form';
import styles from './layout.module.css';

import FormAdmin from '../Admins/Form/index';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/admins" component={Admins} />
          <Route path="/classes" component={Classes} />
          <Route path="/members" component={Members} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route path="/super-admins" component={SuperAdmins} />
          <Route path="/trainers" component={Trainers} />
          <Route exact path="/activities" component={Activities} />
          <Route path="/activities/form/:id?" component={FormActivity} />
          <Route path="/activities" component={Activities} />
          <Route exact path="/admins" component={Admins} />
          <Route path="/admins/form/:id?" component={FormAdmin} />
          <Route exact path="/classes" component={Classes} />
          <Route path="/classes/ClassForm/:id?" component={FormClasses} />
          <Route exact path="/members" component={Members} />
          <Route path="/members/form/:id?" component={MembersForm} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route path="/super-admins" component={SuperAdmins} />
          <Route exact path="/trainers" component={Trainers} />
          <Route path="/trainers/form/:id?" component={FormTrainer} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
