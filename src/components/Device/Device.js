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

    getNumExt(){
        if(this.state.device.conductorNumExt === null){
            return "S/N"
        }else{
            return this.state.device.conductorNumExt ;
        }
    }

    getNumInt(){
        if(this.state.device.conductorNumInt === null){
            return ", Int. S/N"
        }else{
            return ", Int. " + this.state.device.conductorNumInt
        }
        
    }

    redirect = (id) => {
        this.props.history.push(`/device/update/${id}`)
    }

    render(){
        return(
            
            <div className="container-fluid">
                
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-7">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h3>Datos del vehiculo</h3></div>
                            <div className="card-body text-left">
                                <label><strong>Conductor:</strong>{this.state.device.conductorFullName}</label><br/>
                                <label><strong>Domicilio:</strong>{this.state.device.conductorAddress}, #{this.getNumExt()}{this.getNumInt()}</label><br/>
                                <label><strong>Colonia:</strong>{this.state.device.conductorDistrict}</label><br/>
                                <label><strong>Telefono:</strong>{this.state.device.conductorTel}</label>
                                <div className="text-right">
                                    <button className="btn btn-primary btn-sm" onClick={() => this.redirect(this.state.device._id)}><img src="../img/Users-Edit-User-icon-24.png" alt="editar conductor"/> Editar</button>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div className="col-sm-12 col-md-5 ">
                    {this.renderMap()}
                    <br/>
                    <label><strong>Ultima localizacion:</strong> {this.state.device.lastLocation}</label>
                    </div>
                    
                </div>           
                <br/>
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
                            <div className="card-header bg-dark text-white"><h4>Viajes realizados</h4></div>
                            <div className="card-body bg-retro">
                            <div>
                                <h1 className="text-white">Viajes: {this.state.device.contTravel}</h1>
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