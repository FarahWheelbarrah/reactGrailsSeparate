import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css'

function DeleteVehicleButton(props) {
    var btnText = "Delete Vehicle"
    if (props.numberOfCheckedBoxes > 1)
        btnText += "s";
    return (
        <Button disabled={props.numberOfCheckedBoxes === 0} onClick={props.onVehicleDeletion}>{btnText}</Button>
    );
}

export default DeleteVehicleButton;
