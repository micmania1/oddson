import React from 'react';
import { Challenge } from '../../packages';

interface Props {
  arenaId: string,
  challenge: Challenge,
}

const Complete = (props: Props) => {
  const { challenge } = props;

  const challengeMatched = Number(challenge.challenger.number) === Number(challenge.victim.number);

  return (
    <div>
      <p>Results...</p>
      <p>{challenge.challenger.name}: {challenge.challenger.number}</p>
      <p>{challenge.victim.name}: {challenge.victim.number}</p>
      <p>Odds: {challenge.odds}</p>
      <p>{ challengeMatched && `Unluggy! ${challenge.victim.name} you have to ${challenge.challenge}!` }</p>
      <p>{ !challengeMatched && 'Close one!' }</p>
    </div>
  );
};

export default Complete;
