import React from 'react';
import { Form, FormControl, FormInput, FormLabel, Heading, Spacing, Subheading } from '@makes-apps/lib';

import { PoolEntry, PoolGame, PoolParty } from '../../store/pools';

import GolfMajorPoolEntry from './golf_major_entry';
import NbaFreeAgencyPoolEntry from './nba_free_agency_entry';
import { isGolf, isNbaFa } from './utils';

interface Props {
  modifyPoolEntry: (entry: PoolEntry) => Promise<any>;
  poolEntry: PoolEntry;
  poolGame: PoolGame;
  poolParty: PoolParty;
}

const View = ({ modifyPoolEntry, poolEntry, poolGame, poolParty }: Props) => {
  const tuple: [PoolGame, PoolParty, PoolEntry] = [poolGame, poolParty, poolEntry];

  if (isGolf(tuple)) {
    const [game, party, entry] = tuple;
    return <GolfMajorPoolEntry modifyPoolEntry={modifyPoolEntry} poolGame={game} poolParty={party} poolEntry={entry} />;
  }

  if (isNbaFa(tuple)) {
    const [game, party, entry] = tuple;
    return (
      <NbaFreeAgencyPoolEntry modifyPoolEntry={modifyPoolEntry} poolGame={game} poolParty={party} poolEntry={entry} />
    );
  }

  return <>unable to determine what to show here</>;
};

const Entry = (props: Props) => (
  <>
    <Heading color="primary" noMargin>
      {props.poolEntry.name}
    </Heading>
    <Subheading color="secondary">{props.poolEntry.email}</Subheading>
    <Form
      initialForm={{ name: props.poolEntry.name }}
      footer={{ primary: {} }}
      onSubmit={({ data }) => props.modifyPoolEntry({ ...props.poolEntry, name: data.name })}
    >
      {({ data, setFormField }) => (
        <>
          <FormControl>
            <FormLabel>joining party</FormLabel>
            <FormInput disabled value={props.poolParty.name} />
          </FormControl>
          <FormControl>
            <FormLabel>name</FormLabel>
            <FormInput value={data.name} onChange={e => setFormField('name', e.target.value)} />
          </FormControl>
        </>
      )}
    </Form>
    <Spacing top size="mega">
      <View {...props} />
    </Spacing>
  </>
);

export default Entry;
