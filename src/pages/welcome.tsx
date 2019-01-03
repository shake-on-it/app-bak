import React from 'react';
import { connect } from 'react-redux';
import { Button, StackedPage, Spacing, Text } from '@makes-apps/lib';
import { AppState } from '../app';
import { User } from '../store/users';
import urls from '../urls';

interface Props {
  user?: User;
}

class WelcomePage extends React.Component<Props> {
  render() {
    return (
      <StackedPage title="Welcome to Shake On It!">
        <Spacing bottom size="kilo">
          <Text color="secondary" size="kilo">
            A great place to meet friends and make bets.
          </Text>
        </Spacing>
        <Button
          as="Link"
          to={urls.home()}
          size="tera"
          color="primary"
          radius="mega"
          shape="rounded"
          variant="floating"
          width="femto"
        >
          Game onnn!!!
        </Button>
      </StackedPage>
    );
  }
}

const mapStateToProps = ({ auth }: AppState) => ({ user: auth.user });

export default connect(mapStateToProps)(WelcomePage);
