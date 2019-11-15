import React from 'react';
import axios from 'axios';
import Vehicles from './Vehicles';
import AddVehicleForm from "./AddVehicleForm";

import 'whatwg-fetch';

class Garage extends React.Component {
    state = {
            vehicles: [],
            makes: [],
            models: [],
            drivers: []
        }
    
    componentDidMount() {
        this.makeGetRequest('vehicle', res => {
            const vehicles = res.data;
            this.setState({vehicles});
        });

        this.makeGetRequest('make', res => {
            const makes = res.data;
            this.setState({makes});
        });

        this.makeGetRequest('model', res => {
            const models = res.data;
            this.setState({models});
        });

        this.makeGetRequest('driver', res => {
            const drivers = res.data;
            this.setState({drivers});
        });
    }

    render() {
        const {vehicles, makes, models, drivers} = this.state;

        return (
            <div>
                <AddVehicleForm onSubmit={this.submitNewVehicle}
                                makes={makes} models={models} drivers={drivers}/>
                <Vehicles vehicles={vehicles} onVehicleDeletion={this.deleteVehicles}/>
            </div>
        );
    }

    submitNewVehicle = (vehicle) => {
        axios.post('/vehicle', vehicle)
        .then(res => {
            const vehicles = this.state.vehicles;
            vehicles.push(res.data);
            this.setState({vehicles});
        })
        .catch(err => console.log('Unable to save vehicle'));
    };

    deleteVehicles = (checkedIds) => {
        checkedIds.forEach(vehicleID => {
            axios.delete('/vehicle/ + ' + vehicleID)
            .then(res => {
                const vehicles = this.state.vehicles;
                vehicles.splice(vehicles.findIndex(vehicle => vehicle.id === vehicleID), 1);
                this.setState({vehicles});
            })
            .catch(err => {
                var errMessage = 'Unable to delete vehicle';
                if (checkedIds.length > 1)
                    errMessage += 's';
                console.log(errMessage);
            });
        });
    }

    makeGetRequest = (dataName, actionToComplete) => {
        axios.get('/' + dataName)
        .then(actionToComplete)
        .catch(err => console.log('Error retrieving '+ dataName + 's: ' + err));
    }
}
export default Garage;
