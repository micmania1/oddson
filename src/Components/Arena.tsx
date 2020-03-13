import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {
}

const Arena = (props: Props) => {
    let { arenaId } = useParams();

    return (
        <div>{arenaId}</div>
    );
};

export default Arena;