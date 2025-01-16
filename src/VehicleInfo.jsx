import React, { useState } from "react";

import axios from 'axios'

const VehicleInfo = () => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleData, setVehicleData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchVechicleInfo = async () => {
        setError('');
        setLoading(true);
        try {
            const reponse = await axios.get(`http://api.cyberethic.in/vehicle.php?key=ce27f90472f3654e56d8ccf9a9cc7aa4&number=${vehicleNumber}`);
            setVehicleData(reponse.data);
        } catch (err) {
            setError('Error fetching vehicle information. Plz check the number and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        fetchVechicleInfo();
    };

    return(
        <div>
            <form onSubmit={handleSumbit}>
                <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="Enter Vechivle Number"
                required/>
                <button type="sumbit">Get Info</button>
            </form>
            {loading && <p>Loading..</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {vehicleData && (
                 <div>
                 <h2>
                     Vehicle Details
                 </h2>
                 <pre>{JSON.stringify(vehicleData, null, 2)}</pre>
             </div>
            )}
        </div>
    );
};

export default VehicleInfo;