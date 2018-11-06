import React, { Component } from 'react';
import './style.css'

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
            
            <div className="col-sm-12 col-md-6">
            <div className="card ">
                <div className="card-header bg-dark text-white"><h1 className="card-title" onClick={() => this.props.redirect(this.state.device._id)}>{this.state.device.concesion}-T </h1></div>
                <div className="card-body bg-retroyellow text-dark cardTam">
                    <div className="row">
                        <div className="col-sm-6 text-left">
                        <p className="fontbold">
                        
                        <strong>{this.state.device.conductorName}</strong> <br/>
                        <strong>{this.state.device.conductorLastname}</strong> <br/>
                        <strong>{this.state.device.marcaVehicle}</strong><br/>
                        <strong>({this.state.device.modeloVehicle})</strong><br/>
                        <strong>{this.state.device.anioVehicle}</strong><br/>
                        <strong>{this.state.device.placaVehicle}</strong>
                        
                        </p>
                        </div>
                        <div className="col-sm-6">
                            <img src={this.state.device.image_url_conductor} alt="" width="150px"/><br/>
                            Operador
                        </div>
                    </div>
                    
                </div>
                <div className="card-footer bg-retroyellow">
                    <button className="btn btn-block btn-dark" onClick={() => this.props.redirect(this.state.device._id)}> Ver mas </button>
                </div>
                
            </div>
            <br/>
            </div>
        )
    }
}

export default CardDevice;