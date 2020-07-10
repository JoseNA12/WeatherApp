import React from 'react';
import Forecast from './components/Forecast/Forecast'

import Container from 'react-bootstrap/Container';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Footer from './components/Footer/Footer';


const App = () => {
    return (
        <Container>
            <NavigationBar />

            <Forecast />

            <Footer />
        </Container>
    );
};

export default App;