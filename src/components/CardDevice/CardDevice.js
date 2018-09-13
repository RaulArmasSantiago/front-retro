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
            
            <div className="col-sm-12 col-md-4 col-lg-3" style={{width: "14rem;"}}>
            <div className="card">
                <div className="card-header bg-dark text-white"><h5 className="card-title" onClick={() => this.props.redirect(this.state.device._id)}>{this.state.device.name}</h5></div>
                <div className="card-body bg-retro text-white">
                        {this.state.device.user}
                        <b>Ultima Localizacion:</b>
                        <br/>
                        {this.state.device.lastLocation}
                        Constructor: {this.state.device.conductorName}
                </div>
                <div className="card-footer bg-warning">
                    <button className="btn btn-dark" onClick={() => this.props.redirect(this.state.device._id)}> Ver mas </button>
                </div>
            </div>
            <br/>
            </div>
        )
    }
}

export default CardDevice;