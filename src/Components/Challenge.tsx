import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button } from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';
import ApiFactory from '../Utils/api';
import { Challenge as ChallengeInt } from '../packages';

const { checkChallenge } = ApiFactory();

interface Props {
}

const Challenge = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [challengeDetails, setChallengeDetails] = useState<ChallengeInt|undefined>();
    const { arenaId } = useParams();

    useEffect(() => {
        const load = async () => {
            if (arenaId === undefined) {
                return;
            }

            const { data: challengeInfo } = await checkChallenge(arenaId);
            setChallengeDetails(challengeInfo);
            setLoading(false);
        }

        load();
    }, [arenaId]);

    if (arenaId === undefined) {
        return <Redirect to="/" />
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (challengeDetails === undefined) {
        return <p>Challenge not found.</p>;
    }

    const submit = () => {
        console.log('submit');
    };

    const { challenger, victim, challenge } = challengeDetails;

    return (
        <Grid container spacing={6} component="form" onSubmit={submit}>
            <Grid item xs={12}>
                <p>{victim.name}, you have been challenged by {challenger.name} to {challenge}</p>
                <p>Odds on?</p>
            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
            <Grid item xs={12} md={6}>
                <Button></Button>
            </Grid>
        </Grid>
    );
};

export default Challenge;