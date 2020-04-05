import React from 'react';
import { Challenge } from '../../packages';
import Grid from '@material-ui/core/Grid';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

interface Props {
  arenaId: string;
  challenge: Challenge;
}

const NewChallenge = (props: Props) => {
  const { arenaId, challenge } = props;

  const challengerLink = `${window.location.origin}/#/challenge/${arenaId}`;
  const copyChallengerLink = () => {
    if (!window.navigator.clipboard) {
      return;
    }
    window.navigator.clipboard.writeText(challengerLink);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h2">Challenge initiated!</Typography>
        <Typography component="p">Waiting for other person to enter odds...</Typography>
        <Typography component="p">Give this link to {challenge.victim.name}:</Typography>

        <FormControl variant="filled" fullWidth>
          <InputLabel htmlFor="challenger-link">Challenger&apos;s link</InputLabel>
          <FilledInput
            id="challenger-link"
            type="text"
            inputProps={{
              readOnly: true,
            }}
            value={challengerLink}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Copy link"
                  onClick={copyChallengerLink}
                  edge="end"
                >
                  <FileCopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default NewChallenge;
