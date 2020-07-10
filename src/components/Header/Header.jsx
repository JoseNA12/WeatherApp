import React from 'react';
import { headerCss, textHeaderCss } from './Header.css';


const Header = props => {
    return (
        <div style={ headerCss }>
            <div style={ textHeaderCss }>
                <h5 className="text-muted">{ props.location }</h5>
            </div>
        </div>
    );
};

Header.defaultProps = {
    location: "Lugar desconocido"
}

export default Header;