import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';
import superAdminForm from '../SuperAdmins/Form/index';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/activities" component={Activities} />
          <Route path="/admins" component={Admins} />
          <Route path="/classes" component={Classes} />
          <Route path="/members" component={Members} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route path="/trainers" component={Trainers} />
          <Route path="/super-admins/form/" component={superAdminForm} />
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
