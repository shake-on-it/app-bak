import React from 'react';
import { Heading, List, Text, Wrapping } from '@makes-apps/lib';

const About = () => (
  <>
    <Heading>let's make a bet...</Heading>
    <Wrapping as="section">
      <Heading as="h2">what is this?</Heading>
      <Text>"shake on it" is many things:</Text>
      <List>
        <Text>a sportsbook</Text>
        <Text>a pool manager</Text>
        <Text>a competition</Text>
      </List>
    </Wrapping>
    <Wrapping as="section" limit={61.8}>
      <Heading as="h2">how do i play?</Heading>
      <Text>
        just play! every time you participate in a wager, pool, or league, you are in effect wagering your skill, your
        coin, and your reputation. but that's all...
      </Text>
      <Heading as="h3">wagers</Heading>
      <Text>
        this is a situation where two players go head-to-head in some bet. this bet was proposed by one party, and
        accepted voluntarily by the other party. once the event has completed, both parties will be required to indicate
        the result of the wager. assuming the results match, the respective payout is exchanged.
      </Text>
      <Text>
        try as we might, we cannot control people and their actions. at some points, you may find yourself dealing with
        a participant who falsifies the result to their benefit, despite what actual results may have occurred. hey,
        maybe the original bet was simply misunderstood. in any event, the result will be put to arbitration in order to
        determine the final result.
      </Text>
      <Heading as="h4">wager arbitration</Heading>
      <Text>
        as many a baseball player will attest, it is always unfortunate to reach this stage in the game. should a wager
        result require arbitration, it will adhere to the following process:
      </Text>
      <List ordered>
        <Text>the wager will be anonymized, only original terms and conditions will be presented</Text>
        <Text>a random community member will receive notification of this wager and be asked to settle the deal</Text>
        <Text>they may elect to not provide an opinion, or they may submit the winner (in their opinion)</Text>
        <Text>
          by submitting a winner, they are wagering their reputation -- if their answer agrees with the group, they earn
          10 pts, but lose 5 pts if they are wrong
        </Text>
        <Text>this process continues until SEVEN responses have been collected</Text>
        <Text>the majority decision determines the outcome</Text>
        <Text>
          if the first FOUR responses come in with the same decision, the arbitration process is terminated and those
          four participants are awarded 20 pts of reputation
        </Text>
      </List>
      <Heading as="h4">the commish</Heading>
      <Text>
        as with every institutionally flawed, poorly run sports league, there still exists a commissioner. in this case,
        the commish will just make sure the system runs as expected without the influence of any bad actors. it will
        ultimately be the commish' sole discretion to determine if any misguided play is being condutcted with any
        matter pertaining to "shake on it".
      </Text>
    </Wrapping>
  </>
);

export default About;
