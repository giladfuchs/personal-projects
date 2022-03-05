import React, { useEffect, Suspense, useState } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import ReactLoading from 'react-loading';

import { History } from 'history';
import Layout from './models/ui/Layout/layout';
import { getIsValidDomain, getisLogin, getIsAdmin, getIsTokenSet } from './store/selectors';
import { LoginCheck } from './store/general/index';



const DomainLoginClient = React.lazy(() => {
  return import("./containers/domain/auth/domain-login/client-login.domain");
});
const DomainRegisterClient = React.lazy(() => {
  return import("./containers/domain/auth/domain-login/client-register.domain");
});

const SerivcesClient = React.lazy(() => {
  return import("./containers/domain/service/serivces.settings");
});

const SerivcesSettings = React.lazy(() => {
  return import("./containers/admin/settings/services/serivces.settings");
});
const OpeningHours = React.lazy(() => {
  return import("./containers/admin/settings/opening-hours/opening-hours.settings");
});
const BusinessSettings = React.lazy(() => {
  return import("./containers/admin/settings/business-settings/business-settings.settings");
});

const CalendarUser = React.lazy(() => {
  return import(
    "./containers/admin/calendar/calendar.business");
});


const BusinessLogin = React.lazy(() => {
  return import('./containers/admin/auth/busniess-login/business-login.business');
});
const BusinessLogout = React.lazy(() => {
  return import('./containers/admin/auth/shared/logout');
});
const BusinessRegister = React.lazy(() => {
  return import('./containers/admin/auth/business-register/business-register.business');
});

const EmployeeReset = React.lazy(() => {
  return import("./containers/admin/auth/busniess-login/reset-password/reset-employee-password.business");
});

const SetNewEmployeePassword = React.lazy(() => { return import("./containers/admin/auth/busniess-login/reset-password/setNew-employee-password.business") });

const Home = React.lazy(() => {
  return import("./containers/shared/home");
});

interface DispatchProps {
  signInCheck: typeof LoginCheck
}

interface StateProps {
  isLogin: boolean,
  isAdmin: boolean,
  isTokenSet: boolean,
  isValidDomain: boolean
}


interface Params extends RouteComponentProps<any> { history: History };
type Props = DispatchProps & StateProps & Params;
const App: React.FC<Props> = (props) => {

  const { signInCheck, isLogin, isAdmin, isValidDomain, isTokenSet } = props;
  const [routes, setRoutes] = useState<any>(<Switch>
    <Route path="/admin/register" render={() => <BusinessRegister />} />
    <Route path="/admin/login" render={() => <BusinessLogin />} />
    <Route path="/admin/resetpassword/:token" render={(props) => <SetNewEmployeePassword {...props} />} />
    <Route path="/admin/resetpassword" render={() => <EmployeeReset />} />
    <Route path="/:domain" render={(props) => <DomainLoginClient {...props} />} />
    <Route path="/" render={() => <Home />} />

  </Switch>);


  useEffect(() => {

    // console.log(isLogin);
    signInCheck();


  }, [isTokenSet, signInCheck]);

  useEffect(() => {

    (isLogin && isAdmin) ?
      setRoutes(
        <Switch>
          <Route path="/admin/services" render={() => <SerivcesSettings />} />
          <Route path="/admin/hours" render={() => <OpeningHours />} />
          <Route path="/admin/businesssettings" render={() => <BusinessSettings />} />
          <Route path="/admin/calander" render={() => <CalendarUser />} />
          <Route path="/logout" render={() => <BusinessLogout />} />
          <Route path="/" render={() => <Home />} />
        </Switch>)
      : isLogin ? setRoutes(
        <Switch>
          <Route path="/:domain/calendar" render={() => <CalendarUser />} />
          <Route path="/logout" render={() => <BusinessLogout />} />
          <Route path="/:domain" render={() => <SerivcesClient />} />
          <Route path="/" render={() => <Home />} />
        </Switch>)
        : isValidDomain && setRoutes(
          <Switch>
            <Route path="/:domain/register" render={(props) => <DomainRegisterClient {...props} />} />
            <Route path="/:domain" render={(props) => <DomainLoginClient {...props} />} />
            <Route path="/" render={() => <Home />} />
          </Switch>);
  }, [isValidDomain, isLogin, isAdmin]);


  return (
    <div>
      <Layout isLogin={isLogin} isAdmin={isAdmin} isValidDomain={isValidDomain}  >
        <Suspense fallback={<ReactLoading type="bars" color="#7467ef" height={100} width={100} />
        }>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  isLogin: getisLogin(state),
  isTokenSet: getIsTokenSet(state),
  isAdmin: getIsAdmin(state),
  isValidDomain: getIsValidDomain(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  signInCheck: () => dispatch(LoginCheck())
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(withRouter(App));



