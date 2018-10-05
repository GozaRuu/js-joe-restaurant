import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

const Menu = (props) => {

    return (
        <div className="container">
            <div className="row">
                {
                    props.dishes.map((dish) => {
                        return (
                            <div key={dish.id} className="col-12 col-md-5 m-1">
                                <Card onClick={() => props.onClick(dish.id)}>
                                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                                    <CardImgOverlay>
                                        <CardTitle>{dish.name}</CardTitle>
                                    </CardImgOverlay>
                                </Card>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Menu;
