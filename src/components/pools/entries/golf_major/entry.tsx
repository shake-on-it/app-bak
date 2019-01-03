import React from 'react';
import { styled, styles, Form, FormControl, FormGroup, FormInput, FormLabel } from '@makes-apps/lib';
import moment from 'moment';

import { Golfer, GolfMajorPickemEntry, GolfMajorPickemGame, GolfMajorPickemParty } from '../../../../store/pools';
import { User } from '../../../../store/users';

interface Props {
  modifyPoolEntry: (entry: GolfMajorPickemEntry) => Promise<any>;
  poolEntry: GolfMajorPickemEntry;
  poolGame: GolfMajorPickemGame;
  poolParty: GolfMajorPickemParty;
  user: User;
}

const GolferPicker = styled.div<{}>(
  styles(css => () =>
    css({
      display: 'flex',
    })
  )
);

const GolferList = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      ul: {
        height: '300px',
        overflowY: 'auto',
      },
      'ul > li:not(:first-child)': {
        marginTop: theme.spacers.rems.femto,
      },
      'ul > li > button': {
        marginRight: theme.spacers.rems.femto,
        outline: 'none',
        backgroundColor: 'transparent',
        border: `${theme.spacers.rems.yocto} solid ${theme.colors.neutral[5]}`,
        borderRadius: '50%',
      },
    })
  )
);

const StyledButton = styled.button<{}>(
  styles(css => ({ theme }) =>
    css({
      padding: `${theme.spacers.rems.femto} ${theme.spacers.rems.micro}`,
      cursor: 'pointer',
    })
  )
);

const golferName = (name: string, country?: string) => `${name}${country ? ` (${country})` : ''}`;

const PoolEntry = ({ modifyPoolEntry, poolEntry, poolGame, poolParty, user }: Props) => {
  const picks: Golfer[] = poolEntry.picks || [];
  const golfers: Golfer[] = poolGame.field.filter(({ key }) => !picks.some(pick => pick.key === key));

  const hasStarted = moment(poolGame.event_start).isBefore(moment.now());

  return (
    <Form
      initialForm={{ name: poolEntry.name, golfers, picks }}
      footer={{ primary: {} }}
      onSubmit={({ data }) => {
        window.scrollTo(0, 0);
        modifyPoolEntry({ ...poolEntry, name: data.name, picks: data.picks });
      }}
      disabled={({ data }) => data.picks.length !== 5}
    >
      {({ data, setFormField, setFormData }) => (
        <>
          <FormGroup inline>
            <FormControl size="m">
              <FormLabel>joining party</FormLabel>
              <FormInput disabled value={poolParty.name} />
            </FormControl>
            <FormControl size="m">
              <FormLabel>name</FormLabel>
              <FormInput
                value={data.name}
                onChange={e => setFormField('name', e.target.value)}
                disabled={poolEntry.email !== user.email}
              />
            </FormControl>
          </FormGroup>
          <FormControl>
            <GolferPicker>
              <GolferList>
                <FormLabel>field</FormLabel>
                <ul>
                  {data.golfers.map(({ key, name, country }) => (
                    <li key={key}>
                      <StyledButton
                        disabled={hasStarted}
                        onClick={() =>
                          setFormData({
                            golfers: data.golfers.filter(golfer => golfer.key !== key),
                            picks: data.picks.concat({ key, name, country }),
                          })
                        }
                      >
                        +
                      </StyledButton>
                      {golferName(name, country)}
                    </li>
                  ))}
                </ul>
              </GolferList>
              <GolferList>
                <FormLabel>picks</FormLabel>
                <ul>
                  {data.picks.map(({ key, name, country }) => (
                    <li key={key}>
                      <StyledButton
                        disabled={hasStarted}
                        onClick={() =>
                          setFormData({
                            golfers: data.golfers.concat({ key, name, country }),
                            picks: data.picks.filter(golfer => golfer.key !== key),
                          })
                        }
                      >
                        -
                      </StyledButton>
                      {golferName(name, country)}
                    </li>
                  ))}
                </ul>
              </GolferList>
            </GolferPicker>
          </FormControl>
        </>
      )}
    </Form>
  );
};

export default PoolEntry;
