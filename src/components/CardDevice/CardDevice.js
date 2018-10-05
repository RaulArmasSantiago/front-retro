import React, { Component } from 'react';

class CardDevice extends Component{
    constructor(props){
        super(props);
        this.state = {
            device:props.device,
        }
    }

    render(){
        console.log(this.state.device)
        return (
            
            <div className="col-sm-12 col-md-6 col-lg-4" style={{width: "14rem;"}}>
            <div className="card">
                <div className="card-header bg-dark text-white"><h5 className="card-title" onClick={() => this.props.redirect(this.state.device._id)}>Concesión #: {this.state.device.concesion} </h5></div>
                <div className="card-body bg-retroyellow text-dark">
                    {this.state.device.user}
                    <b>Ultima Localización:</b>
                    <br/>
                    {this.state.device.lastLocation}
                    <br/>
                    <strong>Conductor:</strong><br/> 
                    {this.state.device.conductorFullName}
                    <br/>
                    <strong> Vehículo: </strong> <br/>
                    {this.state.device.marcaVehicle} ({this.state.device.modeloVehicle})
                    <br/>
                    <strong> Placa: </strong> <br/>
                    {this.state.device.placaVehicle}
                </div>
                <div className="card-footer bg-grey">
                    <button className="btn btn-dark" onClick={() => this.props.redirect(this.state.device._id)}> Ver mas </button>
                </div>
            </div>
            <br/>
            </div>
        )
    }
}

export default CardDevice;