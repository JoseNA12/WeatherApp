import React from 'react';
import DayCondition from '../DayCondition/DayCondition';

import CardDeck from 'react-bootstrap/CardDeck';
import Header from '../Header/Header';
import { firstCardCss, remainingCardsCss } from './Forecast.css';


const axios = require('axios').default;


class Forecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            coordinates: { lat: 0, lon: 0 },
            daysCondition: [],
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
                    coordinates: { 
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    },
                    location: `${ response[0].data.city_name }, ${ response[0].data.country_code }`,
                    daysCondition: response[0].data.data
                });
            }
            if (response[1].status === 200) {
                //this.setState({});
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
                <DayCondition 
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

    getDayName(date) {
        var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return `${days[date.getDay()]}`;
    }

    getMonthName(date) { 
        return String(date.getDate()).padStart(2, '0') + " de " + date.toLocaleString('default', { month: 'long' });
    }

    getFormatDate(ts) { return new Date(ts * 1000); }

    getFormatTime() {
        return new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric" });
    }

    render() {
        return (
            <section>
                <Header location={ this.state.location }/>
                <CardDeck>
                    { this.renderCardsDaysCondition() }
                </CardDeck>
            </section>
        )
    }
}

export default Forecast;