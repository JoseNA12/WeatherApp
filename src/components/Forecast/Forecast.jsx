import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Header from '../Header/Header';
import DayCondition from '../DayCondition/DayCondition';

const axios = require('axios').default;


class Forecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            daysCondition: [],
        };
    }

    componentDidMount() {
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(position => {
                axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?` +
                    `lat=${position.coords.latitude}&` +
                    `lon=${position.coords.longitude}&` +
                    `key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&` +
                    `lang=es&units=M&days=5`
                )
                .then(resp => {
                    if (resp.status === 200) {
                        this.setState({ 
                            location: `${ resp.data.city_name }, ${ resp.data.country_code }`,
                            daysCondition: resp.data.data
                        });
                    }
                })
                .catch(() => {
                    this.setState({ location: "Ha sucedido un error al tratar de recibir la información." });
                })
            });
        }
        else {
            this.setState({ location: "La geolocalización no está disponible." })
        }
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
                <Header text={ this.state.location }/>
                <CardDeck>
                    { this.renderCardsDaysCondition() }
                </CardDeck>
            </section>
        )
    }
}

export default Forecast;