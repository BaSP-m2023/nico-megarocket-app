import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/index';

const Activities = React.lazy(() => import('../Activities'));
const AdminClasses = React.lazy(() => import('../Users/Admin/classes'));
const AdminTrainers = React.lazy(() => import('../Users/Admin/trainers'));
const AdminMembers = React.lazy(() => import('../Users/Admin/members'));
const AdminSubscriptions = React.lazy(() => import('../Users/Admin/subscriptions'));
const AdminProfile = React.lazy(() => import('../Users/Admin/profile'));
const MemberActivities = React.lazy(() => import('../Users/Member/activities'));
const MemberClasses = React.lazy(() => import('../Users/Member/classes'));
const MembersForm = React.lazy(() => import('../Members/Form/MembersForm'));
const MemberProfile = React.lazy(() => import('../Users/Member/profile'));
const FormActivity = React.lazy(() => import('../Activities/FormActivities'));
const FormClasses = React.lazy(() => import('../Classes/Form'));
const FormTrainer = React.lazy(() => import('../Trainers/FormTrainers'));
const Admin = React.lazy(() => import('../Admins/'));
const SuperAdmin = React.lazy(() => import('../SuperAdmins/index'));
const FormSubscriptions = React.lazy(() => import('../Subscriptions/FormSubscription/Index'));
const FormAdmin = React.lazy(() => import('../Admins/Form/index'));
const FormSupAdmin = React.lazy(() => import('../SuperAdmins/Form/index'));
const FormLogin = React.lazy(() => import('../Auth/Login/index'));

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
            <React.Suspense>
              <Switch>
                <Route exact path="/superAdmin/admin" component={Admin} />
                <Route path="/superAdmin/admin/form/:id?" component={FormAdmin} />
                <Route exact path="/superAdmin/superadmin" component={SuperAdmin} />
                <Route path="/superAdmin/superadmin/form/:id?" component={FormSupAdmin} />
                <Route exact path="/superAdmin/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/admin/activities" component={Activities} />
                <Route path="/admin/activities/form/:id?" component={FormActivity} />
                <Route exact path="/admin/classes" component={AdminClasses} />
                <Route path="/admin/classes/ClassForm/:id?" component={FormClasses} />
                <Route exact path="/admin/trainers" component={AdminTrainers} />
                <Route path="/admin/trainers/form/:id?" component={FormTrainer} />
                <Route exact path="/admin/members" component={AdminMembers} />
                <Route path="/admin/members/form/:id?" component={MembersForm} />
                <Route exact path="/admin/subscriptions" component={AdminSubscriptions} />
                <Route path="/admin/subscriptions/form/:id?" component={FormSubscriptions} />
                <Route exact path="/admin/profile" component={AdminProfile} />
                <Route exact path="/member/">
                  <Redirect to="/member/classes" />
                </Route>
                <Route path="/member/classes" component={MemberClasses} />
                <Route path="/member/activities" component={MemberActivities} />
                <Route path="/member/profile" component={MemberProfile} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route path="/auth/login" component={FormLogin} />
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
