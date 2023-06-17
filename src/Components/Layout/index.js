import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/index';

const Admin = React.lazy(() => import('../Users/Admin'));
const AdminClasses = React.lazy(() => import('../Users/Admin/classes'));
const AdminTrainers = React.lazy(() => import('../Users/Admin/trainers'));
const AdminMembers = React.lazy(() => import('../Users/Admin/members'));
const AdminSubscriptions = React.lazy(() => import('../Users/Admin/subscriptions'));
const AdminProfile = React.lazy(() => import('../Users/Admin/profile'));
const Member = React.lazy(() => import('../Users/Member'));
const MemberClasses = React.lazy(() => import('../Users/Member/classes'));
const MemberActivities = React.lazy(() => import('../Users/Member/activities'));
const MemberProfile = React.lazy(() => import('../Users/Member/profile'));
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
                <Route exact path="/admin" component={Admin}>
                  <Redirect to="/admin/classes" />
                </Route>
                <Route path="/admin/classes" component={AdminClasses} />
                <Route path="/admin/trainers" component={AdminTrainers} />
                <Route path="/admin/members" component={AdminMembers} />
                <Route path="/admin/subscriptions" component={AdminSubscriptions} />
                <Route path="/admin/profile" component={AdminProfile} />
                <Route exact path="/member" component={Member}>
                  <Redirect to="/member/classes" />
                </Route>
                <Route path="/member/classes" component={MemberClasses} />
                <Route path="/member/activities" component={MemberActivities} />
                <Route path="/member/profile" component={MemberProfile} />
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
