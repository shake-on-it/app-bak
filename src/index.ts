import 'core-js';

import { AppFactory, debounce, LocalAppState, registerAuthListener } from '@makes-apps/lib';
import App, { makeAppReducer, APP_LOCAL_KEY, AppContext, AppState } from './app';
import { setUser } from './store/auth';
import { findOne, User } from './store/users';

const factory = new AppFactory(AppState());

const history = factory.createHistory();
const store = factory.createStore(makeAppReducer(history), AppContext('shake-on-it-hybzb'));

store.subscribe(
  debounce(() => {
    LocalAppState.write(APP_LOCAL_KEY, store.getState().auth);
  }, 500)
);

const renderApp = factory.createRenderer(history, store, 'root', makesTheme =>
  makesTheme({
    primaryColor: 'green',
    secondaryColor: 'neutral',
    logoFont: 'Graduate, serif',
    headingFont: 'Raleway, sans-serif',
    bodyFont: 'Alegreya, serif',
  })
);

registerAuthListener(auth =>
  auth.user
    ? store
        .dispatch<any>(findOne.creator.worker({ email: auth.user.profile.email }))
        .then((user: User | undefined) => store.dispatch(setUser.creator.action(user)))
    : store.dispatch(setUser.creator.action(undefined))
);

renderApp(App);

if (module.hot) {
  module.hot.accept('./app/app', () => {
    const app = require('./app/app');
    renderApp(app);
  });
}
