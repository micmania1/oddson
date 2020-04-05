import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ApiFactory from '../Utils/api';
import { Challenge } from '../packages';
import Loading from './Loading';
import NewChallenge from './Arena/NewChallenge';
import Activated from './Arena/Activated';
import Complete from './Arena/Complete';

const { checkChallenge } = ApiFactory();

interface Props {
}

const Arena = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | undefined>();
  const {arenaId} = useParams();

  useEffect(() => {
    const load = async () => {
      if (arenaId === undefined) {
        return;
      }

      const {data: challengeInfo} = await checkChallenge(arenaId);
      setChallenge(challengeInfo);
      setLoading(false);
    };

    load();
  }, [arenaId]);

  if (arenaId === undefined) {
    return <Redirect to="/"/>
  }

  if (loading) {
    return <Loading />;
  }

  if (challenge === undefined) {
    return <Redirect to="/"/>
  }

  if (challenge.status === 'new') {
    const passProps = { arenaId, challenge };
    return <NewChallenge {...passProps} />;
  }

  if (challenge.status === 'activated') {
    const passProps = { arenaId, challenge, setChallenge };
    return <Activated {...passProps} />
  }

  if (challenge.status === 'complete') {
    const passProps = { arenaId, challenge };
    return <Complete {...passProps} />
  }

  return (
    <div>{arenaId}</div>
  );
};

export default Arena;
