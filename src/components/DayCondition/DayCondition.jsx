import React from 'react';
import Card from 'react-bootstrap/Card';


function DayCondition(props) {
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title><b>Card title</b></Card.Title> 
                <Card.Text>
                    <small className="text-muted">Mes NumDia, Hora am/pm</small> <br />
                    <Card.Img variant="top" src="#" /><br />
                    <b>Grados</b>
                </Card.Text>
            </Card.Body>
            <small className="text-muted"><b>Last updated 3 mins ago</b></small> <br />
        </Card>
    );
}

export default DayCondition;