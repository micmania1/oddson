import React, { useState, ChangeEvent, FormEvent } from 'react';
import ApiFactory from '../../Utils/api';
import { Challenge } from '../../packages';
import Grid from '@material-ui/core/Grid';
import {
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

const { completeChallenge } = ApiFactory();

interface Props {
  arenaId: string;
  challenge: Challenge;
  setChallenge: (challengeInfo: Challenge | undefined) => void;
}

const Arena = (props: Props) => {
  const { arenaId, challenge, setChallenge } = props;
  const [number, updateNumber] = useState('');
  const [numberError, updateNumberError] = useState('');

  const isInt = (input: string) => Number(input) % 1 === 0;

  const validate = () => {
    if (Number(number) < 1) {
      updateNumberError('Your number must be greater than 0');
      return false;
    }

    if (!isInt(number)) {
      updateNumberError('Enter a real number, come on');
      return false;
    }

    if (Number(number) > Number(challenge.odds)) {
      updateNumberError('Your number can\'t be greater than the odds');
      return false;
    }

    updateNumberError('');

    return true;
  };

  // https://media.tenor.com/images/ec1a862e91ffeaaff2299e290b0007c8/tenor.png
  const cLockItInEddy = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
    const { data: challengeInfo } = await completeChallenge(arenaId, {
      number: Number(number),
    });
    setChallenge(challengeInfo);
  };

  return (
    <Grid container spacing={6} component="form" onSubmit={cLockItInEddy}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h2">The final countdown</Typography>
        <Typography component="p">
          {challenge.victim.name} has entered odds of <strong>{challenge.odds}</strong>. What&apos;s
          your number?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="number"
          label="Your number"
          error={Boolean(numberError)}
          helperText={numberError}
          fullWidth
          multiline
          value={number}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button color="primary" variant="contained" type="submit">See results</Button>
      </Grid>
    </Grid>
  );

};

export default Arena;
