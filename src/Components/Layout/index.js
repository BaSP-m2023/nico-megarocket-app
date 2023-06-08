import Admins from '../Admins/index';
import Classes from '../Classes';
import Members from '../Members';
import { MembersForm } from '../Members/Form/MembersForm';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';
import FormSuperAdmin from '../SuperAdmins/Form/index';
import FormTrainer from '../Trainers/FormTrainers';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Activities from '../Activities';
import FormActivity from '../Activities/FormActivities';
import Home from '../Home/index';
import Header from '../Header/index';
import { Navbar } from '../Navbar/Navbar';
import Footer from '../Footer/index';
import FormClasses from '../Classes/Form';
import styles from './layout.module.css';
import FormAdmin from '../Admins/Form/index';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.asideContainer}>
            <aside>
              <Navbar />
            </aside>
          </div>
          <div className={styles.switchContainer}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route exact path="/activities" component={Activities} />
              <Route path="/activities/form/:id?" component={FormActivity} />
              <Route exact path="/admins" component={Admins} />
              <Route path="/admins/form/:id?" component={FormAdmin} />
              <Route exact path="/classes" component={Classes} />
              <Route path="/classes/ClassForm/:id?" component={FormClasses} />
              <Route exact path="/members" component={Members} />
              <Route path="/members/form/:id?" component={MembersForm} />
              <Route exact path="/subscriptions" component={Subscriptions} />
              <Route exact path="/super-admins" component={SuperAdmins} />
              <Route path="/super-admins/form/:id?" component={FormSuperAdmin} />
              <Route exact path="/trainers" component={Trainers} />
              <Route path="/trainers/form/:id?" component={FormTrainer} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
