import React from 'react';
import Forecast from './components/Forecast/Forecast'

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { jumbotron } from './App.css.jsx';


const App = () => {
    return (
        <Container>
            <Jumbotron style={ jumbotron }> 
                <h1 className="header text-center">5-Days Weather App</h1>
            </Jumbotron>

            <Forecast/>
        </Container>
    );
};

export default App;