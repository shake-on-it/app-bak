import React from 'react';
import { Form, FormControl, FormGroup, FormInput, FormLabel, FormSelect, FormToggle } from '@makes-apps/lib';

import { poolFors, poolMeta, PoolGame } from '../../store/pools';

interface Props {
  game: Partial<PoolGame>;
  savePoolGame: (game: PoolGame) => any;
}

const newPoolMeta = ({ type, mode, for: _for }: any): any => {
  return (poolMeta as any)[type][mode](_for);
};

const optionMapper = (_for: string) => ({ label: _for, value: _for });

const poolTypeOptions = Object.keys(poolFors).map(optionMapper);

const poolModeOptions = (type: any): { label: string; value: string }[] => {
  return Object.keys((poolFors as any)[type]).map(optionMapper);
};

const poolForOptions = (type: any, mode: any): { label: string; value: string }[] => {
  return (poolFors as any)[type][mode].map(optionMapper);
};

const GameForm = ({ game, savePoolGame }: Props) => {
  const gameId = game._id ? game._id.toHexString() : '';
  const gameTypeDisabled = !!game.type;
  const gameModeDisabled = !!game.mode;
  const gameForDisabled = !!game.for;
  return (
    <Form
      initialForm={{
        _id: gameId,
        type: game.type || '',
        mode: game.mode || '',
        for: game.for || '',
        open: true,
        active: false,
      }}
      onSubmit={({ data }) =>
        savePoolGame({
          ...newPoolMeta(data),
          open: data.open,
          active: data.active,
        })
      }
      footer={{ primary: {} }}
    >
      {({ data, setFormData, setFormField }) => (
        <>
          {data._id && (
            <FormControl>
              <FormLabel>id</FormLabel>
              <FormInput disabled value={data._id} />
            </FormControl>
          )}
          <FormControl>
            <FormLabel>type</FormLabel>
            <FormSelect
              disabled={gameTypeDisabled}
              name="type"
              value={data.type}
              options={poolTypeOptions}
              onChange={e => {
                const value = e.target.value;
                if (value !== data.type) {
                  setFormData({ mode: '', for: '' });
                }
                setFormField('type', value);
              }}
            />
          </FormControl>
          {data.type && (
            <>
              <FormControl>
                <FormLabel>mode</FormLabel>
                <FormSelect
                  disabled={gameModeDisabled}
                  name="mode"
                  value={data.mode}
                  options={poolModeOptions(data.type)}
                  onChange={e => {
                    const value = e.target.value;
                    if (value !== data.mode) {
                      setFormField('for', '');
                    }
                    setFormField('mode', value);
                  }}
                />
              </FormControl>
              {data.mode && (
                <>
                  <FormControl>
                    <FormLabel>for</FormLabel>
                    <FormSelect
                      disabled={gameForDisabled}
                      name="for"
                      value={data.for}
                      options={poolForOptions(data.type, data.mode)}
                      onChange={e => setFormField('for', e.target.value)}
                    />
                  </FormControl>
                  {data.for && (
                    <FormGroup inline>
                      <FormControl>
                        <FormLabel>open</FormLabel>
                        <FormToggle on={data.open} onToggle={() => setFormField('open', !data.open)} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>active</FormLabel>
                        <FormToggle on={data.active} onToggle={() => setFormField('active', !data.active)} />
                      </FormControl>
                    </FormGroup>
                  )}
                  {data.type === 'pickem' && data.mode === 'golf_major' && (
                    <div>a custom component rendering the rest of the golf major pickem game</div>
                  )}
                  {data.type === 'pickem' && data.mode === 'nba_free_agency' && (
                    <div>a custom component rendering the rest of the nba free agency pickem game</div>
                  )}
                  {data.type === 'bingoball' && data.mode === 'nba' && (
                    <div>a custom component rendering the rest of the nba bingoball game</div>
                  )}
                  {data.type === 'boxes' && data.mode === 'nfl' && (
                    <div>a custom component rendering the rest of the super bowl boxes game</div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Form>
  );
};

export default GameForm;
