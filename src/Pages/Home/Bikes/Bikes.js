import React, { useEffect, useState } from 'react';
import Bike from '../Bike/Bike';
import './Bikes.css';

const Bikes = () => {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch('bikes.json')
            .then((response) => response.json())
            .then(data => setBikes(data));
    }, [])
    return (
        <div>
            <h2 className="text-center text-info fw-bold my-4">Bike Inventory</h2>
            <div className="bikes-container">
                {
                    bikes.map(bike => <Bike
                        key={bike.id}
                        bike={bike}
                    ></Bike>)
                }
            </div>
        </div>
    );
};

export default Bikes;