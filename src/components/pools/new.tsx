import React from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormInput,
  FormLabel,
  FormToggle,
  Heading,
  Hr,
  Spacing,
  StackedPage,
  Subheading,
  Wrapping,
} from '@makes-apps/lib';

import { PoolEntry, PoolGame, PoolParty } from '../../store/pools';
import { User } from '../../store/users';
import urls from '../../urls';

interface Props {
  createPoolEntry: (entry: PoolEntry) => Promise<any>;
  createPoolParty: (party: PoolParty) => Promise<any>;
  games: { [key: string]: { [key: string]: { [key: string]: PoolGame } } };
  gotoPool: (partyId: string) => void;
  user: User;
}

const NewPool = ({ createPoolEntry, createPoolParty, games, gotoPool, user }: Props) => {
  const [poolType, setPoolType] = React.useState('');
  const [poolMode, setPoolMode] = React.useState('');
  const [poolFor, setPoolFor] = React.useState('');
  //
  // const pools = games.reduce(
  //   (acc, { type, mode, for: _for }) => {
  //     const modes = acc[type] || {};
  //     return {
  //       ...acc,
  //       [type]: {
  //         ...modes,
  //         [mode]: (modes[mode] || []).concat(_for),
  //       },
  //     };
  //   },
  //   {} as { [key: string]: { [key: string]: string[] } }
  // );

  return (
    <StackedPage
      title={<Heading color="primary">Create a Pool</Heading>}
      menu={[{ type: 'link', to: urls.pools().url(), display: 'view all pools' }]}
    >
      <Wrapping>
        <Hr />
        <Subheading color="secondary">What type of pool are you creating?</Subheading>
        <ButtonGroup align="center">
          {Object.keys(games).map(type => (
            <Button
              key={type}
              as="button"
              onClick={() => {
                if (type !== poolType) {
                  setPoolMode('');
                  setPoolFor('');
                }
                setPoolType(type);
              }}
            >
              {type}
            </Button>
          ))}
        </ButtonGroup>
      </Wrapping>
      {poolType && (
        <>
          <Spacing bottom size="mega">
            <Wrapping>
              <Hr />
              <Subheading color="secondary">{`Which type of ${poolType} Game?`}</Subheading>
              <ButtonGroup align="center">
                {Object.keys(games[poolType]).map(mode => (
                  <Button
                    key={mode}
                    as="button"
                    onClick={() => {
                      if (mode !== poolMode) {
                        setPoolFor('');
                      }
                      setPoolMode(mode);
                    }}
                  >
                    {mode}
                  </Button>
                ))}
              </ButtonGroup>
            </Wrapping>
          </Spacing>
          {poolMode && (
            <>
              <Spacing bottom size="mega">
                <Wrapping>
                  <Hr />
                  <Subheading color="secondary">{`Which ${poolMode}?`}</Subheading>
                  <ButtonGroup align="center">
                    {Object.keys(games[poolType][poolMode]).map(_for => (
                      <Button key={_for} as="button" onClick={() => setPoolFor(_for)}>
                        {_for}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Wrapping>
              </Spacing>
              {poolFor && (
                <Form
                  initialForm={{
                    type: poolType,
                    mode: poolMode,
                    for: poolFor,
                    host: user.email,
                    name: '',
                    note: '',
                    private: false,
                    maxEntries: '1',
                  }}
                  onSubmit={({ data: { host, name, note, private: isPrivate, maxEntries, ...meta } }) => {
                    createPoolParty({
                      ...(meta as any),
                      host,
                      name,
                      note,
                      private: isPrivate,
                      max_entries: parseInt(maxEntries) || 1,
                    }).then(id =>
                      createPoolEntry({
                        ...(meta as any),
                        party_id: id,
                        email: host,
                        name: 'a bracket with no name',
                      }).then(() => gotoPool(id.toHexString()))
                    );
                  }}
                  footer={{ primary: {} }}
                >
                  {({ data, setFormField }) => (
                    <>
                      <FormGroup inline>
                        <FormControl>
                          <FormLabel>type</FormLabel>
                          <FormInput disabled value={data.type} />
                        </FormControl>
                        <FormControl>
                          <FormLabel>mode</FormLabel>
                          <FormInput disabled value={data.mode} />
                        </FormControl>
                        <FormControl>
                          <FormLabel>for</FormLabel>
                          <FormInput disabled value={data.for} />
                        </FormControl>
                      </FormGroup>
                      <FormGroup inline>
                        <FormControl>
                          <FormLabel>host</FormLabel>
                          <FormInput disabled value={data.host} />
                        </FormControl>
                        <FormControl>
                          <FormLabel>name</FormLabel>
                          <FormInput value={data.name} onChange={e => setFormField('name', e.target.value)} />
                        </FormControl>
                      </FormGroup>
                      <FormControl>
                        <FormLabel>note</FormLabel>
                        <FormInput
                          as="textarea"
                          rows="5"
                          value={data.note}
                          onChange={e => setFormField('note', e.target.value)}
                        />
                      </FormControl>
                      <FormGroup inline>
                        <FormControl>
                          <FormLabel>private</FormLabel>
                          <FormToggle on={data.private} onToggle={() => setFormField('private', !data.private)} />
                        </FormControl>
                        <FormControl>
                          <FormLabel>max entries per user</FormLabel>
                          <FormInput
                            value={data.maxEntries}
                            onChange={e => setFormField('maxEntries', e.target.value)}
                          />
                        </FormControl>
                      </FormGroup>
                    </>
                  )}
                </Form>
              )}
            </>
          )}
        </>
      )}
    </StackedPage>
  );
};

export default NewPool;
