import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';

import DayConditionContainer from './components/DayCondition/DayConditionContainer';
import Header from './components/Header/Header';

import './App.css';


const App = () => {
    return (
        <Container>
            <Jumbotron>
                <h1 className="header text-center">5-Days Weather App</h1>
            </Jumbotron>

            <Header text="Hola Mundo"/>
            
            <CardDeck>
                <DayConditionContainer />
            </CardDeck>
        </Container>
    );
};

export default App;