import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';
import ApiFactory from '../Utils/api';
import { Challenge as ChallengeInt } from '../packages';
import Complete from './Arena/Complete';
import { STATUS_ACTIVATED, STATUS_COMPLETE } from '../state/challenge';

const { checkChallenge, activateChallenge } = ApiFactory();

const Challenge: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [challengeDetails, setChallengeDetails] = useState<ChallengeInt | undefined>();
  const [odds, updateOdds] = useState('');
  const [oddsError, updateOddsError] = useState('');
  const [number, updateChoice] = useState('');
  const [numberError, updateChoiceError] = useState('');
  const { arenaId } = useParams();

  const load = useCallback(async (): Promise<void> => {
    if (arenaId === undefined) {
      return;
    }

    const { data: challengeInfo } = await checkChallenge(arenaId);
    setChallengeDetails(challengeInfo);
    setLoading(false);
  }, [arenaId]);

  useEffect(() => {
    load();
  }, [arenaId, load]);

  useEffect(() => {
    if (challengeDetails && challengeDetails.status !== STATUS_COMPLETE) {
      const interval = setInterval(load, 1000);

      return () => clearInterval(interval);
    }
  }, [load, challengeDetails]);

  if (arenaId === undefined) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (challengeDetails === undefined) {
    return <p>Challenge not found.</p>;
  }

  const { challenger, victim, challenge } = challengeDetails;

  if (challengeDetails.status === STATUS_ACTIVATED) {
    return <p>Waiting for {challenger.name} to enter their number...</p>;
  }

  if (challengeDetails.status === STATUS_COMPLETE) {
    const passProps = { arenaId, challenge: challengeDetails };
    return <Complete {...passProps} />
  }

  const isInt = (input: string): boolean => Number(input) % 1 === 0;

  const validate = (): boolean => {
    if (Number(odds) < 1) {
      updateOddsError('Your odds must be greater than 0');
      return false;
    }

    if (!isInt(odds)) {
      updateOddsError('Enter a real number, come on');
      return false;
    }

    if (Number(number) < 1) {
      updateChoiceError('Your number must be greater than 0');
      return false;
    }

    if (!isInt(number)) {
      updateChoiceError('Enter a real number, come on');
      return false;
    }

    if (Number(number) > Number(odds)) {
      updateChoiceError('Your number can\'t be greater than the odds');
      return false;
    }

    updateOddsError('');
    updateChoiceError('');

    return true;
  };

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (validate()) {
      const { data: challengeInfo } = await activateChallenge(arenaId, {
        odds: Number(odds),
        number: Number(number),
      });
      setChallengeDetails(challengeInfo);
    }
  };

  return (
    <Grid container spacing={6} component="form" onSubmit={submit}>
      <Grid item xs={12}>
        <p>{victim.name}, you have been challenged by {challenger.name} to {challenge}</p>
        <p>Odds on?</p>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="odds"
          error={Boolean(oddsError)}
          helperText={oddsError}
          label="Your odds"
          fullWidth
          value={odds}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => updateOdds(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="number"
          error={Boolean(numberError)}
          helperText={numberError}
          label="Your chosen number"
          fullWidth
          value={number}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => updateChoice(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button color="primary" variant="contained" type="submit">Lock it in</Button>
      </Grid>
    </Grid>
  );
};

export default Challenge;
