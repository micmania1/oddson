import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ApiFactory from '../Utils/api';
import { Challenge } from '../packages';
import Loading from './Loading';
import NewChallenge from './Arena/NewChallenge';
import Activated from './Arena/Activated';
import Complete from './Arena/Complete';
import { STATUS_NEW, STATUS_ACTIVATED, STATUS_COMPLETE } from '../state/challenge';

const { checkChallenge } = ApiFactory();

const Arena: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | undefined>();
  const { arenaId } = useParams();

  const load = useCallback(async (): Promise<void> => {
    if (arenaId === undefined) {
      return;
    }

    const { data: challengeInfo } = await checkChallenge(arenaId);
    setChallenge(challengeInfo);
    setLoading(false);
  }, [arenaId]);

  useEffect(() => {
    load();
  }, [arenaId, load]);

  useEffect(() => {
    if (challenge && challenge.status !== STATUS_COMPLETE) {
      const interval = setInterval(load, 1000);

      return () => clearInterval(interval);
    }
  }, [load, challenge]);

  if (arenaId === undefined) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <Loading />;
  }

  if (challenge === undefined) {
    return <Redirect to="/" />
  }

  if (challenge.status === STATUS_NEW) {
    const passProps = { arenaId, challenge };
    return <NewChallenge {...passProps} />;
  }

  if (challenge.status === STATUS_ACTIVATED) {
    const passProps = { arenaId, challenge, setChallenge };
    return <Activated {...passProps} />
  }

  if (challenge.status === STATUS_COMPLETE) {
    const passProps = { arenaId, challenge };
    return <Complete {...passProps} />
  }

  return (
    <div>{arenaId}</div>
  );
};

export default Arena;
