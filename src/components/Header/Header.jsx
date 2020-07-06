import React from 'react';


const Header = props => {
    return (
        <div className="text-center">
            <h5 className="text-muted">{ props.text }</h5>
        </div>
    );
};

Header.defaultProps = {
    text: "Lugar desconocido"
}

export default Header;