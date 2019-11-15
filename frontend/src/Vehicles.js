import React from 'react';
import { array } from 'prop-types';
import { Table } from 'antd';
import DeleteVehicleButton from "./DeleteVehicleButton";

const { Column } = Table;

class Vehicles extends React.Component {
    state = {
        checkedIds: []
    }

    render() {
        const rowSelection = {
            onChange: (checkedIds) => {
                this.setState({checkedIds})
            }
        };

        const vehicleRows = this.props.vehicles.map((vehicle) => {
            return {
                    key: vehicle.id,
                    id: vehicle.id,
                    name: vehicle.name,
                    make: vehicle.make.name,
                    model: vehicle.model.name,
                    driver: vehicle.driver.name
                }
            }
        );

        return (
            <div>
                <Table rowSelection={rowSelection} dataSource={vehicleRows}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Make" dataIndex="make" key="make" />
                    <Column title="Model" dataIndex="model" key="model" />
                    <Column title="Driver" dataIndex="driver" key="driver" />
                </Table>
                <DeleteVehicleButton numberOfCheckedBoxes={this.state.checkedIds.length} onVehicleDeletion={this.onDeletionSubmit}/>
            </div>
        );

        
    }

    

    handleCheckboxChange = (event) => {
        const checkedIds = this.state.checkedIds.slice();
        if (!event.target.checked) {
            checkedIds.splice(checkedIds.indexOf(event.target.value), 1);
        } else
            checkedIds.push(event.target.value);
        this.setState({
            checkedIds: checkedIds
        });
    }

    onDeletionSubmit = () => {
        this.props.onVehicleDeletion(this.state.checkedIds);
        this.setState({
            checkedIds: []
        });
    }
}

Vehicles.propTypes = {
    vehicles: array
};

export default Vehicles;
