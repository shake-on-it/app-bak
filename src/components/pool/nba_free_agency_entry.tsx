import React from 'react';
import { styled, styles, Form, FormControl, FormGroup, FormInput, FormLabel, Heading, Text } from '@makes-apps/lib';

import { NbaFreeAgencyPickemEntry, NbaFreeAgencyPickemGame, NbaFreeAgencyPickemParty } from '../../store/pools';

interface Props {
  modifyPoolEntry: (entry: NbaFreeAgencyPickemEntry) => Promise<any>;
  poolEntry: NbaFreeAgencyPickemEntry;
  poolGame: NbaFreeAgencyPickemGame;
  poolParty: NbaFreeAgencyPickemParty;
}

const StyledLabel = styled.div<{}>(
  styles(css => () =>
    css({
      alignSelf: 'center',
      flexShrink: 0,
      flexBasis: '200px',
      display: 'flex',
      flexDirection: 'column',
    })
  )
);

const PoolEntry = ({ poolEntry, poolGame }: Props) => {
  const picks: { [key: string]: { team: string; score: number } } = poolEntry.picks.reduce(
    (acc, { name, ...rest }) => ({
      ...acc,
      [name]: rest,
    }),
    {}
  );

  const initialForm: { [key: string]: { team: string; score: number } } = poolGame.field.reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: poolEntry ? picks[name] : { team: '', score: 0 },
    }),
    {}
  );

  return (
    <Form disabled initialForm={initialForm}>
      {({ data, statuses, setFormField, validate }) => (
        <>
          {poolGame.field.map(({ name, team, note }) => {
            const pick = data[name];
            return (
              <FormGroup key={name} inline>
                <StyledLabel>
                  <Heading as="h6" color="primary" font="body" noMargin>
                    {name}
                  </Heading>
                  <Text color="secondary" size="base">{`${team}${note ? ` (${note})` : ''}`}</Text>
                </StyledLabel>
                <FormControl size="s">
                  <FormLabel>Next Team</FormLabel>
                  <FormInput
                    value={pick.team}
                    onChange={e => setFormField(name, { ...pick, team: e.target.value })}
                    onBlur={() => validate(name)}
                    status={statuses[name]}
                  />
                </FormControl>
                <FormControl size="s">
                  <FormLabel>Confidence</FormLabel>
                  <FormInput
                    value={pick.score === 0 ? '' : pick.score}
                    onChange={e => setFormField(name, { ...pick, score: parseInt(e.target.value) })}
                    onBlur={() => validate(name)}
                    status={statuses[name]}
                  />
                </FormControl>
              </FormGroup>
            );
          })}
        </>
      )}
    </Form>
  );
};

export default PoolEntry;
