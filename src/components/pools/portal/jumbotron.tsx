import React from 'react';
import { styled, styles, Heading, Hr, Subheading, Text, Wrapping } from '@makes-apps/lib';

import { PoolGame, PoolParty } from '../../../store/pools';

interface Props {
  poolGame: PoolGame;
  poolParty: PoolParty;
}

const StyledJumbotron = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      margin: `${theme.spacers.rems.mega} 0`,
      padding: theme.spacers.rems.mega,
      display: 'flex',
      flexDirection: 'column',
      border: `${theme.spacers.pixels.zepto} solid ${theme.colors.neutral[5]}`,
      borderRadius: theme.spacers.pixels.mega,
    })
  )
);

const StyledNote = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      padding: theme.spacers.rems.micro,
      backgroundColor: theme.colors.light,
      whiteSpace: 'pre-line',
    })
  )
);

const Jumbotron = ({ poolGame, poolParty }: Props) => (
  <StyledJumbotron>
    <Heading color="primary" noMargin>
      {poolParty.name}
    </Heading>
    <Subheading size="base" color="secondary" noMargin>{`${poolGame.type} | ${poolGame.mode} | ${
      poolGame.for
    }`}</Subheading>
    <Hr />
    <Wrapping>
      <Text noMargin>{`A note from the host, ${poolParty.host}:`}</Text>
      <StyledNote>
        <Text noMargin>{poolParty.note}</Text>
      </StyledNote>
    </Wrapping>
  </StyledJumbotron>
);

export default Jumbotron;
