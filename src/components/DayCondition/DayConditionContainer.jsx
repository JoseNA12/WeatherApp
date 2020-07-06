import React from 'react';
//import PropTypes from 'prop-types';
import DayCondition from './DayCondition';


class DayConditionContainer extends React.Component {

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
            windSpeed:          this.props.windSpeed
        }
    }

    render() {
        return (
            <DayCondition 
                day =               { this.state.day }
                date =              { this.state.date }
                time =              { this.state.time }
                image =             { this.state.image }
                temperatureValue =  { this.state.temperatureValue }
                temperatureMin =    { this.state.temperatureMin }
                temperatureMax =    { this.state.temperatureMax }
                humedity =          { this.state.humedity }
                windSpeed =         { this.state.windSpeed }
            />
        );
    }
}

export default DayConditionContainer;