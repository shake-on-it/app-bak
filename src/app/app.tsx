import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { adminActions, Alert, StackedLayout } from '@makes-apps/lib';

import { LongLogo, StackedLogo } from '../components';
import * as authActions from '../store/auth';
import { User } from '../store/users';
import urls from '../urls';

import AppRoutes from './routes';
import AppState from './state';

interface StateProps {
  alerts: Alert[];
  user?: User;
  working: number;
}

interface DispatchProps {
  ackAlert: () => void;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  sendEmailConfirmation: (email: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmEmail: (token: string, tokenId: string) => Promise<void>;
  resetPassword: (token: string, tokenId: string, password: string) => Promise<void>;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class AppLayout extends React.Component<Props> {
  render() {
    const {
      ackAlert,
      location: { pathname: currentRoute },
      login,
      logout,
      register,
      sendEmailConfirmation,
      sendPasswordReset,
      confirmEmail,
      resetPassword,
      user,
      alerts,
      working,
    } = this.props;

    const nav: { [key: string]: string } = {};
    if (user && user.type === 'me') {
      nav['admin'] = urls.admin();
    }
    nav['home'] = urls.home();
    // nav['make a bet'] = AppUrls.bets.list;
    nav['pools'] = urls.pools().url();
    nav['users'] = urls.users().url();

    return (
      <StackedLayout
        currentRoute={currentRoute}
        logo={{
          to: user ? urls.home() : urls.welcome(),
          img: largeDisplay => (largeDisplay ? <StackedLogo /> : <LongLogo />),
        }}
        logout={logout}
        nav={nav}
        urls={{ login: urls.auth().login() }}
        user={user}
        ackAlert={ackAlert}
        alerts={alerts}
        working={working}
      >
        <AppRoutes
          redirects={{ standard: urls.auth().login(), reverse: urls.home() }}
          user={user}
          login={login}
          register={register}
          sendConfirmationEmail={sendEmailConfirmation}
          sendPasswordResetEmail={sendPasswordReset}
          confirmEmail={confirmEmail}
          resetPassword={resetPassword}
        />
      </StackedLayout>
    );
  }
}

const mapStateToProps = ({ admin, auth }: AppState) => ({
  alerts: admin.alerts,
  user: auth.user,
  working: admin.working,
});

const dispatchProps = {
  ackAlert: adminActions.ackAlert.creator.action,
  login: authActions.login.creator.worker,
  logout: authActions.logout.creator.worker,
  register: authActions.register.creator.worker,
  sendEmailConfirmation: authActions.sendConfirmationEmail.creator.worker,
  sendPasswordReset: authActions.sendPasswordResetEmail.creator.worker,
  confirmEmail: authActions.confirmEmail.creator.worker,
  resetPassword: authActions.resetPassword.creator.worker,
};

export default withRouter(
  connect(
    mapStateToProps,
    dispatchProps
  )(AppLayout)
);
