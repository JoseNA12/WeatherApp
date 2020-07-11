import React from 'react';
import Day from '../Day/Day';
import Card from 'react-bootstrap/Card';

import { cardCss, tinyimgCss } from '../Day/Day.css';


class DayDetail extends Day {
    render() {
        return (
            <Card
                className="text-center"
                style={ cardCss }>
                <Card.Body>
                    { this.state.time }
                    <img 
                        className="imgForecast" variant="top" 
                        src={ require(`../../images/forecast/${ this.state.image }.png`) } 
                        alt={ this.state.condition } 
                        style={ tinyimgCss }
                    /> <br />
                    &#x2602; <small className="text-muted">{ `${ this.state.precipitation }%` }</small> <br />
                    <b>{ this.state.temperatureValue }°</b>
                </Card.Body>
                <small className="text-muted"><b>{ this.state.condition }</b></small> <br />
            </Card>
        );
    }
}

export default DayDetail;