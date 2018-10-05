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
                <div className="card-header bg-dark text-white"><h1 className="card-title" onClick={() => this.props.redirect(this.state.device._id)}>{this.state.device.concesion} </h1></div>
                <div className="card-body bg-retroyellow text-dark">
                    <div className="row">
                        <div className="col-sm-6 text-left ">
                        <p className="fontbold">
                            {this.state.device.conductorFullName} <br/>
                            {this.state.device.marcaVehicle} ({this.state.device.modeloVehicle}) - 2018<br/>
                            {this.state.device.placaVehicle}
                        </p>
                        </div>
                        <div className="col-sm-6">
                            <img src={this.state.device.image_url_conductor} alt="" width="180px"/>
                        </div>
                    </div>
                    
                    <br/><br/>
                    <button className="btn btn-block btn-dark" onClick={() => this.props.redirect(this.state.device._id)}> Ver mas </button>
                </div>
                
            </div>
            <br/>
            </div>
        )
    }
}

export default CardDevice;