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
        let efectivo = Number(this.state.device.contEfectivo);

        let efectivoDecimal = efectivo.toFixed(2);
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
            return(
                <div></div>
            )
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-2 bg-retro"><label className="bg-retro font"><strong>{this.state.device.concesion}</strong></label></div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-6"><label className="font">{this.state.device.conductorName} {this.state.device.conductorLastname} </label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <br/><br/>
                <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Carreras realizados</h4></div>
                            <div className="card-body bg-retroyellow">
                            <div>
                                <h1 className="text-dark">{this.state.device.contTravel}</h1>
                            </div>
                            </div>
                        </div>
                        <br className="col-sm-12"/>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Tiempo Trabajado</h4></div>
                            <div className="card-body bg-retroyellow">
                            <div>
                                <h1 className="text-dark">{this.state.device.contTime} min</h1>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>km Trabajados</h4></div>
                            <div className="card-body bg-retroyellow">
                            <div>
                                <h1 className="text-dark0 ">km: {this.state.device.contKm}</h1>
                            </div>
                            </div>  
                        </div>
                        <br className="col-sm-12"/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Velocidad Maxima</h4></div>
                            <div className="card-body bg-retroyellow">
                            <div>
                                <h1 className="text-dark">70 km/h</h1>
                            </div>
                            </div>
                        </div>
                        <br className="col-sm-12"/>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h4>Ganancias del día</h4></div>
                            <div className="card-body bg-retroyellow">
                            <div>
                                <h1 className="text-dark">$ {this.contCash()}</h1>
                            </div>
                            <br className="col-sm-12"/>
                            </div>
                        </div>
                        <br className="col-sm-12"/>
                    </div>
                </div>


                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-5 ">
                        {this.renderMap()}  
                        <br className="col-sm-12"/>                  
                    </div>
                    
                    <div className=" col-sm-12 col-md-7">
                        <div className="card">
                            <div className="card-header bg-dark text-white"><h3>Datos del taxi</h3></div>
                            <div className="card-body text-left">
                            <div className="row">
                                <div className=" card col-sm-6 font">
                                    <center>
                                        <h3>{this.state.device.concesion}</h3>
                                        <strong>
                                        {this.state.device.marcaVehicle} ( {this.state.device.modeloVehicle} )<br/>
                                        {this.state.device.anioVehicle}<br/>
                                        {this.state.device.placaVehicle}<br/>
                                        </strong>
                                    </center>
                                </div>
                                <div className="card col-sm-6">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                            <img className="d-block w-100" src={this.state.device.image_url_conductor} alt="Conductor"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100" src={this.state.device.image_url_fvehicle} alt="Second slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100" src={this.state.device.image_url_lvehicle} alt="Third slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100" src={this.state.device.image_url_rvehicle} alt="Third slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100" src={this.state.device.image_url_bvehicle} alt="Third slide"/>
                                            </div>
                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                            
                            </div>
                            <div className="card-footer">
                                <div className="text-right">
                                    <button className="btn btn-primary btn-sm" onClick={() => this.redirect(this.state.device._id)}><img src="../img/Users-Edit-User-icon-24.png" alt="editar conductor"/> Editar</button>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    
                    
                </div>           
                <br/>
                
            </div>
        )
    }
}

export default Device;