import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CustomTheme from './Theme';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Components/Home';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Router>
                <Route path="/" exact component={Home} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
