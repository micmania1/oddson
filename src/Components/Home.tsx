import React, { useState, FormEvent, ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Scott from '../images/scott.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        backgroundImage: `url(${Scott})`,
        backgroundSize: 'cover',
        maxWidth: '100%',
    },
    paper: {
        width: '100%',
        maxWidth: '800px',
        padding: theme.spacing(3),
    },
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

    const [person1, updatePerson1] = useState('');
    const [person2, updatePerson2] = useState('');
    const [challenge, updateChallenge] = useState('');

    const submit = (e: FormEvent) => {
        e.preventDefault();

        const body = {
            person1,
            person2,
            challenge,
        };
        console.log(body);
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={6} component="form" onSubmit={submit}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h2" className={classes.title}>Odds on?</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="person1" label="Your name" fullWidth value={person1} onChange={(e: ChangeEvent<HTMLInputElement>) => updatePerson1(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="person2" label="Their name" fullWidth value={person2} onChange={(e: ChangeEvent<HTMLInputElement>) => updatePerson2(e.target.value)}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="challenge" label="Challenge" fullWidth multiline value={challenge} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChallenge(e.target.value)}  />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" type="submit">Create</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Home;
