import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ApiFactory from '../Utils/api';
import { Challenge } from '../packages';

const { checkChallenge } = ApiFactory();

interface Props {
}

const Arena = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [challenge, setChallenge] = useState<Challenge|undefined>();
    const { arenaId } = useParams();

    useEffect(() => {
        const load = async () => {
            if (arenaId === undefined) {
                return;
            }

            const { data: challengeInfo } = await checkChallenge(arenaId);
            setChallenge(challengeInfo);
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

    if (challenge === undefined) {
        return <Redirect to="/" />
    }

    if (challenge.status === 'new') {
        return (
            <div>
                <p>Waiting for other person to enter odds...</p>
                <p>Give this link to {challenge.victim.name}: {`${window.location.origin}/#/challenge/${arenaId}`}</p>
            </div>
        );
    }

    return (
        <div>{arenaId}</div>
    );
};

export default Arena;
