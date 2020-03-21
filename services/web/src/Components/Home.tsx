import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ApiFactory from '../Utils/api';

const { createChallenge } = ApiFactory();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    }
  }),
);

interface Props {
}

interface State {
    person1: string,
    person2: string,
    challenge: string,
}

const Home = (props: Props) => {
    const classes = useStyles();

    const [redirectTo, setRedirectTo] = useState('');
    const [challenger, updateChallenger] = useState('');
    const [victim, updateVictim] = useState('');
    const [challenge, updateChallenge] = useState('');

    if (redirectTo !== '') {
        return <Redirect to={redirectTo} />
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const body = {
            challenger,
            victim,
            challenge,
        };

        const { data: challengeInfo } = await createChallenge(body);

        setRedirectTo(`/arena/${challengeInfo.id}`)
    }

    return (
        <Grid container spacing={6} component="form" onSubmit={submit}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h2" className={classes.title}>Odds on?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField id="person1" label="Your name" fullWidth value={challenger} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChallenger(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField id="person2" label="Their name" fullWidth value={victim} onChange={(e: ChangeEvent<HTMLInputElement>) => updateVictim(e.target.value)}  />
            </Grid>
            <Grid item xs={12}>
                <TextField id="challenge" label="Challenge" fullWidth multiline value={challenge} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChallenge(e.target.value)}  />
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" type="submit">Create</Button>
            </Grid>
        </Grid>
    );
};

export default Home;
