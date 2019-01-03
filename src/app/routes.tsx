import React from 'react';
import Loadable from 'react-loadable';
import { AuthRoutes, AuthRoute, LoadingPage } from '@makes-apps/lib';
import { User } from '../store/users';
import urls from '../urls';

const WelcomePage = Loadable({
  loader: () => import('../pages').then(module => module.WelcomePage),
  loading: LoadingPage,
});

const AdminPage = Loadable({
  loader: () => import('../pages').then(module => module.AdminPage),
  loading: LoadingPage,
});

const HomePage = Loadable({
  loader: () => import('../pages').then(module => module.HomePage),
  loading: LoadingPage,
});

const PoolsPage = Loadable({
  loader: () => import('../pages').then(module => module.PoolsPage),
  loading: LoadingPage,
});

const UsersPage = Loadable({
  loader: () => import('../pages').then(module => module.UsersPage),
  loading: LoadingPage,
});

const LoginPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedLoginPage),
  loading: LoadingPage,
});
const RegisterPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedRegisterPage),
  loading: LoadingPage,
});
const EmailConfirmationPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedEmailConfirmationPage),
  loading: LoadingPage,
});
const PasswordResetPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedPasswordResetPage),
  loading: LoadingPage,
});
const ConfirmEmailPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedConfirmEmailPage),
  loading: LoadingPage,
});
const ResetPasswordPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.StackedResetPasswordPage),
  loading: LoadingPage,
});

const NotFoundPage = Loadable({
  loader: () => import('@makes-apps/lib').then(module => module.NotFoundPage),
  loading: LoadingPage,
});

interface Props {
  redirects: { standard: string; reverse: string };
  user?: User;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<void>;
  sendConfirmationEmail: (email: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmEmail: (token: string, tokenId: string) => Promise<void>;
  resetPassword: (token: string, tokenId: string, password: string) => Promise<void>;
}

const AppRoutes = ({
  redirects,
  user,
  login,
  register,
  sendConfirmationEmail,
  sendPasswordResetEmail,
  confirmEmail,
  resetPassword,
}: Props) => (
  <AuthRoutes redirects={redirects} user={user}>
    <AuthRoute exact path={urls.admin()} component={AdminPage} />
    <AuthRoute path={urls.welcome()} component={WelcomePage} />
    <AuthRoute exact path={urls.home()} component={HomePage} />
    <AuthRoute path={urls.pools().url()} component={PoolsPage} />
    <AuthRoute path={urls.users().url()} component={UsersPage} />} />
    <AuthRoute
      reverse
      redirectTo={urls.home()}
      path={urls.auth().login()}
      render={() => (
        <LoginPage
          login={login}
          urls={{ register: urls.auth().register(), confirm: urls.auth().confirmation() }}
        />
      )}
    />
    <AuthRoute
      reverse
      path={urls.auth().register()}
      render={() => (
        <RegisterPage
          register={register}
          urls={{ login: urls.auth().login(), confirm: urls.auth().confirmation() }}
        />
      )}
    />
    <AuthRoute
      reverse
      path={urls.auth().confirmation()}
      render={() => (
        <EmailConfirmationPage
          sendEmailConfirmation={sendConfirmationEmail}
          urls={{ login: urls.auth().login(), register: urls.auth().register() }}
        />
      )}
    />
    <AuthRoute
      open
      path={urls.auth().passwordReset()}
      render={() => (
        <PasswordResetPage
          sendPasswordReset={sendPasswordResetEmail}
          urls={{ login: urls.auth().login(), register: urls.auth().register() }}
        />
      )}
    />
    <AuthRoute
      open
      path={urls.auth().confirmEmail()}
      render={({ location }) => (
        <ConfirmEmailPage
          search={location.search}
          confirmEmail={confirmEmail}
          urls={{ login: urls.auth().login() }}
        />
      )}
    />
    <AuthRoute
      open
      path={urls.auth().resetPassword()}
      render={({ location }) => (
        <ResetPasswordPage
          search={location.search}
          resetPassword={resetPassword}
          urls={{ home: urls.home(), user: urls.users().url() }}
        />
      )}
    />
    <AuthRoute component={NotFoundPage} />
  </AuthRoutes>
);

export default AppRoutes;
