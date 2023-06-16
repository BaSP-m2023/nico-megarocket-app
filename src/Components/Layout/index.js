import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';

const Admins = React.lazy(() => import('../Admins/index'));
const Classes = React.lazy(() => import('../Classes'));
const Members = React.lazy(() => import('../Members'));
const MembersForm = React.lazy(() => import('../Members/Form/MembersForm'));
const Subscriptions = React.lazy(() => import('../Subscriptions'));
const SuperAdmins = React.lazy(() => import('../SuperAdmins'));
const Trainers = React.lazy(() => import('../Trainers'));
const FormSuperAdmin = React.lazy(() => import('../SuperAdmins/Form/index'));
const FormTrainer = React.lazy(() => import('../Trainers/FormTrainers'));
const Activities = React.lazy(() => import('../Activities'));
const FormActivity = React.lazy(() => import('../Activities/FormActivities'));
const Home = React.lazy(() => import('../Home/index'));
const Header = React.lazy(() => import('../Header/index'));
const Navbar = React.lazy(() => import('../Navbar/Navbar'));
const Footer = React.lazy(() => import('../Footer/index'));
const FormClasses = React.lazy(() => import('../Classes/Form'));
const FormAdmin = React.lazy(() => import('../Admins/Form/index'));
const FormSubscriptions = React.lazy(() => import('../Subscriptions/FormSubscription/Index'));

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
            <React.Suspense fallback={<p>Loading</p>}>
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
                <Route path="/subscriptions/form/:id?" component={FormSubscriptions} />
                <Route exact path="/super-admins" component={SuperAdmins} />
                <Route path="/super-admins/form/:id?" component={FormSuperAdmin} />
                <Route exact path="/trainers" component={Trainers} />
                <Route path="/trainers/form/:id?" component={FormTrainer} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </React.Suspense>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
