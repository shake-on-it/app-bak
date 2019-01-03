import React from 'react';
import { StackedPage } from '@makes-apps/lib';

import { HomeAbout, HomeFaq, HomeSettings } from '../components';

type View = 'about' | 'faq' | 'settings';

const HomePage = () => {
  const [view, setView] = React.useState('about' as View);
  return (
    <StackedPage
      menu={[
        { type: 'view', view: 'about', display: 'about' },
        { type: 'view', view: 'faq', display: 'faq' },
        { type: 'view', view: 'settings', display: 'settings' },
      ]}
      activeView={view}
      setView={(view?: View) => setView(view || 'about')}
    >
      {view === 'about' && <HomeAbout />}
      {view === 'faq' && <HomeFaq />}
      {view === 'settings' && <HomeSettings />}
    </StackedPage>
  );
};

export default HomePage;
