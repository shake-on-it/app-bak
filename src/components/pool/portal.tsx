import React from 'react';
import {
  styled,
  styles,
  Button,
  CloseButton,
  DataTable,
  Heading,
  Hr,
  List,
  Subheading,
  Text,
  Wrapping,
} from '@makes-apps/lib';
import { BSON } from 'mongodb-stitch-browser-sdk';

import { PoolEntry, PoolGame, PoolParty } from '../../store/pools';
import { User } from '../../store/users';

import { poolMeta } from './utils';

interface Props {
  createPoolEntry: (entry: PoolEntry) => Promise<any>;
  poolGame: PoolGame;
  poolParty: PoolParty;
  poolEntries: { [key: string]: PoolEntry[] };
  removePoolEntry: (id: BSON.ObjectId) => Promise<any>;
  user: User;
}

const Jumbotron = styled.div<{}>(
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

const Notepad = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      padding: theme.spacers.rems.micro,
      backgroundColor: theme.colors.light,
      whiteSpace: 'pre-line',
    })
  )
);

const RemovableListItem = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
      button: {
        visibility: 'hidden',
        svg: {
          transform: 'scale(0.5)',
        },
      },
      '&:hover button': {
        visibility: 'visible',
      },
    })
  )
);

const PoolPortal = ({ createPoolEntry, poolEntries, poolGame, poolParty, removePoolEntry, user }: Props) => {
  const userEntries = poolEntries[user.email];
  return (
    <>
      <Jumbotron>
        <Heading color="primary" noMargin>
          {poolParty.name}
        </Heading>
        <Subheading size="base" color="secondary" noMargin>{`${poolGame.type} | ${poolGame.mode} | ${
          poolGame.for
        }`}</Subheading>
        <Hr />
        <Wrapping>
          <Text noMargin>{`A note from the host, ${user.email}:`}</Text>
          <Notepad>
            <Text noMargin>{poolParty.note}</Text>
          </Notepad>
        </Wrapping>
      </Jumbotron>
      <Heading as="h3" noMargin>
        My Entries
      </Heading>
      <List>
        {userEntries.map(({ _id, name }) => (
          <RemovableListItem key={name}>
            {userEntries.length > 1 && <CloseButton onClick={() => removePoolEntry(_id)} />}
            {name ? name : 'unknown'}
          </RemovableListItem>
        ))}
        {userEntries.length < poolParty.max_entries && (
          <Button
            as="button"
            color="primary"
            variant="text"
            onClick={() =>
              createPoolEntry({
                ...poolMeta(poolGame),
                party_id: poolParty._id,
                email: user.email,
                name: `bracket #${userEntries.length + 1}`,
              })
            }
          >
            Add New Entry
          </Button>
        )}
      </List>
      <Heading as="h3" noMargin>
        All Entries
      </Heading>
      <DataTable
        columns={[{ header: 'email' }, { header: 'name' }]}
        width="50%"
        data={Object.values(poolEntries).reduce((arr, entry) => arr.concat(...entry), [])}
      />
    </>
  );
};

export default PoolPortal;
