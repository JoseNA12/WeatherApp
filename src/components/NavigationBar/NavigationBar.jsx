import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { navBarCss } from './NavigationBar.css';


const NavigationBar = props => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={ navBarCss }>
            <Navbar.Brand href="#">
                <img
                    src={ require(`../../images/forecast/c02d.png`) }
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="5-Days Weather App logo"
                />{' '}
                5-Days Weather App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link href="https://github.com/JoseNA12/WeatherApp">Info</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;