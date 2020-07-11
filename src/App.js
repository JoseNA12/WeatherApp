import React from 'react';
import Forecast from './components/Forecast/Forecast'

import Container from 'react-bootstrap/Container';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Separator from './components/Separator/Separator';


const App = () => {
    return (
        <Container>
            <NavigationBar />

            <Forecast />

            <Separator />
        </Container>
    );
};

export default App;