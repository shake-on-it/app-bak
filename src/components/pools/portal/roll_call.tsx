import React from 'react';

import { styled, styles, Tag, Heading, Wrapping } from '@makes-apps/lib';

import { User } from '../../../store/users';

interface Props {
  users: User[];
}

const TagContainer = styled.div<{}>(
  styles(css => ({ theme }) =>
    css({
      display: 'flex',
      flexWrap: 'wrap',
      '& :not(:last-child)': {
        marginRight: theme.spacers.rems.micro,
      },
    })
  )
);

const RollCall = ({ users }: Props) => (
  <Wrapping limit={61.8}>
    <Heading as="h2" color="secondary" noMargin>
      Who's Playing?
    </Heading>
    <TagContainer>
      {users.map(({ _id, firstName, lastName }) => (
        <Tag key={_id.toHexString()}>{`${firstName} ${lastName}`}</Tag>
      ))}
    </TagContainer>
  </Wrapping>
);

export default RollCall;
