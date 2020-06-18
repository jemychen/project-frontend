import React from 'react';

const PlaceAnOrder = (props) => {
    // console.log("from place order", props.username)

    return(
        <div>
            <h1>Thank You For Your Order</h1>
            <hr/>
            <h2>Please have a nice day, {props.username.username}!</h2>
        </div>
    )

}


export default PlaceAnOrder