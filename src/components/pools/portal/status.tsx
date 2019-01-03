import React from 'react';
import { Heading, NotificationBanner, Status } from '@makes-apps/lib';
import moment from 'moment';

import { PoolGame } from '../../../store/pools';

interface Props {
  poolGame: PoolGame;
}

const status = (hasStarted: boolean, hasEnded: boolean): Status => {
  if (!hasStarted) {
    return 'success';
  }

  if (hasEnded) {
    return 'debug';
  }
  return 'info';
};

const statusMessage = (hasStarted: boolean, hasEnded: boolean) => {
  if (!hasStarted) {
    return 'This pool is still accepting entries!';
  }

  if (hasEnded) {
    return 'This pool is completed';
  }
  return 'This pool is currently underway...';
};

const Status = ({ poolGame: { event_start, event_done = false } }: Props) => {
  const hasStarted = moment(event_start).isBefore(moment.now());
  return (
    <NotificationBanner status={status(hasStarted, event_done)} align="center" padding="l">
      <Heading as="h6" color="white" noMargin>
        {statusMessage(hasStarted, event_done)}
      </Heading>
    </NotificationBanner>
  );
};

export default Status;
