import React, { Component } from 'react';
import './style.css';
import singleDevice from '../../services/singleDevice';
import Map from '../Map/Map';

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
            //console.log(device.data.data.singleDevice)
            this.setState({device:device.data.data.singleDevice})
        }) 
    }

    contCash(){
        let efectivo = this.state.device.contEfectivo;
        let efectivoDecimal = (Math.round(efectivo * 2) / 2).toFixed(2);
        return efectivoDecimal;
    }

    renderMap(){
        if(this.state.device !== ""){
                return(
                    <div>
                        <Map data={this.state.device.lastLocation}/>
                    </div>
                )
        }else{

        }
    }

    render(){
        return(
            
            <div className="container">
                {this.renderMarker}
                <div className="row justify-content-center">
                    {this.renderMap()}
                </div>
                <p>
                <label><strong>Ultima localizacion:</strong> {this.state.device.lastLocation}</label>
                </p>
                <hr/>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Km Trabajados</h4></div>
                            <div className="card-body bg-retro">
                            <div>
                                <h1 className="text-white">Km: {this.state.device.contKm}</h1>
                            </div>
                            </div>  
                        </div>
                        <br className="col-sm-12"/>
                    </div>
                    
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Tiempo Trabajado</h4></div>
                            <div className="card-body bg-retro">
                            <div>
                                <h1 className="text-white">Minutos: {this.state.device.contTime}</h1>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Dinero ganado</h4></div>
                            <div className="card-body bg-retro">
                            <div>
                                <h1 className="text-white">$ {this.contCash()}</h1>
                            </div>
                            </div>
                        </div>
                        <br className="col-sm-12"/>
                    </div>
                    
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Numero de viajes realizados</h4></div>
                            <div className="card-body bg-retro">
                            <div>
                                <h1 className="text-white">Viajes totales: {this.state.device.contTravel}</h1>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Device;