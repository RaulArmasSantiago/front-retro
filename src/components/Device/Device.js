import React, { Component } from 'react';
import './style.css';
import { GoogleMap, Marker } from 'react-google-maps';
import singleDevice from '../../services/singleDevice';

class Device extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            device:""
        }
    }

    componentDidMount(){
        singleDevice(this.state.id).then((device) => {
            console.log(device.data.data.singleDevice)
            //this.setState({device:device.data.data.singleDevice})
        })
    }

    render(){
        return(
            <div>
                <div className="row justify-content-center">
                    holi
                    
                </div>
            </div>
        )
    }
}

export default Device;