import React from 'react';
import Day from '../Day/Day';
import DayDetail from '../DayDetail/DayDetail';
import Separator from '../Separator/Separator';

import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../Header/Header';
import { firstCardCss, remainingCardsCss } from './Forecast.css';


const axios = require('axios').default;


class Forecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            daysCondition: [],
            todaysConditionDetail: []
        };
    }

    componentDidMount() {
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(position => {
                this.fetchForecastData(position)
            });
        }
        else {
            this.setState({ location: "La geolocalización no está disponible." })
        }
    }

    fetchForecastData(position) {
        const url = 'https://api.weatherbit.io/v2.0/forecast/';
        const coords = `lat=${position.coords.latitude}&lon=${position.coords.longitude}&` +
                        `key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&`;
        axios.all([
            axios.get(`${ url }/daily?${ coords }lang=es&units=M&days=5`),
            axios.get(`${ url }/hourly?${ coords }lang=es&units=M&hours=12`)
        ])
        .then(response => {
            if (response[0].status === 200) {
                this.setState({
                    location: `${ response[0].data.city_name }, ${ response[0].data.country_code }`,
                    daysCondition: response[0].data.data
                });
            }
            if (response[1].status === 200) {
                this.setState({
                    todaysConditionDetail: response[1].data.data
                });
            }
        })
        .catch(() => {
            this.setState({ location: "Ha sucedido un error al tratar de recibir la información." });
        });
    }

    renderCardsDaysCondition() {
        const currentTime = this.getFormatTime();

        const cards = this.state.daysCondition.map((day, index) => {
            const date = this.getFormatDate(day.ts);
            
            return (
                <Day 
                    key=                { index }
                    day=                { this.getDayName(date) }
                    date=               { this.getMonthName(date) }
                    time=               { currentTime }
                    image=              { day.weather.icon }
                    temperatureValue=   { day.temp }
                    temperatureMin=     { day.min_temp }
                    temperatureMax=     { day.max_temp }
                    humedity=           { day.rh }
                    windSpeed=          { day.wind_gust_spd }
                    precipitation=      { day.pop }
                    condition=          { day.weather.description }
                    customStyle=        { index === 0 ? firstCardCss : remainingCardsCss }
                />
            );
        });
        return cards;
    }

    renderCardsTodaysCondition() {
        const cards = this.state.todaysConditionDetail.map((detail, index) => {
            console.log(detail.datetime);
            return (
                <DayDetail 
                    key=                { index }
                    time=               { this.getFormatTime(detail.timestamp_local) }
                    image=              { detail.weather.icon }
                    temperatureValue=   { detail.temp }
                    precipitation=      { detail.pop }
                    condition=          { detail.weather.description }
                />
            );    
        });
        return cards
    }

    getDayName(date) {
        var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return `${days[date.getDay()]}`;
    }

    getMonthName(date) { 
        return String(date.getDate()).padStart(2, '0') + " de " + date.toLocaleString('default', { month: 'long' });
    }

    getFormatDate(ts) { return new Date(ts * 1000); }

    getFormatTime(date = null) {
        return new Date(date).toLocaleTimeString('en-US', { hour12: true, hour: "numeric" });
    }

    render() {
        return (
            <section>
                <Header location={ this.state.location }/>
                <CardDeck>
                    { this.renderCardsDaysCondition() }
                </CardDeck>

                <Separator />
                
                <CardGroup>
                    { this.renderCardsTodaysCondition() }
                </CardGroup>
            </section>
        )
    }
}

export default Forecast;