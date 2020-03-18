import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CustomTheme from './Theme';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import Arena from './Components/Arena';
import Challenge from './Components/Challenge';
import Scott from './images/scott.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundAttachment: 'fixed',
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
    }),
);

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={CustomTheme}>
            <Container className={classes.root}>
                <Paper className={classes.paper}>
                    <Router>
                        <Route path="/" exact component={Home} />
                        <Route path="/arena/:arenaId" component={Arena} />
                        <Route path="/challenge/:arenaId" component={Challenge} />
                    </Router>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
