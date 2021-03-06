import React from 'react';

import { cardCss, imgCss } from './Day.css';
import Card from 'react-bootstrap/Card';


class Day extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            day:                this.props.day,
            date:               this.props.date,
            time:               this.props.time,
            image:              this.props.image,
            temperatureValue:   this.props.temperatureValue,
            temperatureMin:     this.props.temperatureMin,
            temperatureMax:     this.props.temperatureMax,
            humedity:           this.props.humedity,
            windSpeed:          this.props.windSpeed,
            precipitation:      this.props.precipitation, 
            condition:          this.props.condition,
            customStyle:        this.props.customStyle,
        }

    }

    render() {
        return (
            <Card 
                className={ `text-center ${ this.state.customClass }` } 
                style={ { ...cardCss, ...this.state.customStyle } }>

                <Card.Body> 
                    <Card.Title><b>{ this.state.day }</b></Card.Title>
                    <small className="text-muted">{ `${ this.state.date }, ${ this.state.time }` }</small> <br />
                    <img 
                        className="imgForecast" variant="top" 
                        src={ require(`../../images/forecast/${ this.state.image }.png`) } 
                        alt={ this.state.condition } 
                        style={ imgCss }/><br 
                    />
                    <h3><b>{ this.state.temperatureValue }°</b></h3>
                    <small className="text-muted">{ `Min: ${ this.state.temperatureMin }° / Max: ${ this.state.temperatureMax }°` }</small><br /><br />
                    &#x2602; <small className="text-muted">{ `${ this.state.precipitation }%` }</small><br />
                    &#10051; <small className="text-muted">{ `${ this.state.windSpeed } m/s` }</small><br />
                    <small className="text-muted">{ `Humedad: ${ this.state.humedity }%` }</small><br />
                </Card.Body>
                <small className="text-muted"><b>{ this.state.condition }</b></small> <br />
            </Card>
        );
    }
}

export default Day;