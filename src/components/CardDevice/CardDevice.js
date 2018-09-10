import React, { Component } from 'react';

class CardDevice extends Component{
    constructor(props){
        super(props);
        this.state = {
            device:props.device,
        }
    }

    render(){
        return (
            <div className="card col-sm-12 col-md-4 col-lg-3" style={{width: "14rem;"}}>
                <h5 className="card-title" onClick={() => this.props.redirect(this.state.device._id)}>{this.state.device.name}</h5>
                <div className="card-body">
                    <p className="card-text">
                        {this.state.device.user}
                        <b>Ultima Localizacion:</b>
                        <br/>
                        {this.state.device.lastLocation}
                    </p>
                </div>
            </div>
        )
    }
}

export default CardDevice;