import React from 'react';
import { Challenge } from '../../packages';
import { Grid, Typography } from '@material-ui/core';

interface Props {
  arenaId: string;
  challenge: Challenge;
}

const Complete = (props: Props) => {
  const { challenge } = props;

  const challengeMatched = Number(challenge.challenger.number) === Number(challenge.victim.number);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h2">Results...</Typography>
        <Typography component="p">{challenge.challenger.name}: {challenge.challenger.number}</Typography>
        <Typography component="p">{challenge.victim.name}: {challenge.victim.number}</Typography>
        <Typography component="p">Odds: {challenge.odds}</Typography>
        <Typography component="p">{ challengeMatched && `Unluggy! ${challenge.victim.name} you have to ${challenge.challenge}!` }</Typography>
        <Typography component="p">{ !challengeMatched && 'Close one!' }</Typography>
      </Grid>
    </Grid>
  );
};

export default Complete;
