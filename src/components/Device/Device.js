import React, { Component } from 'react';
import './style.css';
import singleDevice from '../../services/singleDevice';
import Map from '../Map/Map';



class Device extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            device:"",
            velocidad:[]
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
        console.log(efectivoDecimal.toLocaleString())
        return efectivoDecimal;
    }

    renderMap(){
        if(this.state.device !== ""){
                return(
                    <div>
                        <Map data={this.state.device.lastLocation} data2={this.state.device.initTravel}/>
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

    

    getHrs(){
        let hrs = Number(this.state.device.contTime);
        hrs = Math.trunc(hrs/60);
        console.log(hrs * 60);
        let min = Number(this.state.device.contTime)
        let min2 = hrs * 60
        min = min - min2;
        console.log(min)
        let tiempo = String(hrs) + " hrs. " + String(min) + " min.";
        return tiempo
    }

    getColor(){
        let velocidad = {
            vel:0,
            color:"",
            porcentaje:""
        }
        velocidad.vel = Math.floor(Math.random() * 161);
        console.log(velocidad)
        velocidad.porcentaje = (velocidad.vel / 160)*100;
        console.log(velocidad.porcentaje)
        velocidad.porcentaje= velocidad.porcentaje + "%"
        if(velocidad.vel <= 60){
            velocidad.color = "progress-bar bg-success"
        }else{
            if(velocidad.vel > 60 && velocidad.vel <= 100){
                velocidad.color = "progress-bar bg-warning"
            }else{
                velocidad.color = "progress-bar bg-danger"
            }
        }

        console.log(velocidad)
        this.setState({
            velocidad:velocidad
        })
        return velocidad.color; 
        
    }
    
    redirect = (id) => {
        this.props.history.push(`/device/update/${id}`)
    }

    redirect2 = (id) => {
        this.props.history.push(`/records/${id}`)
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row justify-content-center head">
                    <div className="col-sm-4 text-center">
                        <label className="text-white"><strong>{this.state.device.conductorName} {this.state.device.conductorLastname}</strong></label>
                    </div>
                    <div className="col-sm-4 text-center">
                        <label className="text-white"><strong>{this.state.device.concesion}-T</strong></label>
                    </div>
                </div>

                <div className="row justify-content-center bodyData">
                    <div className="col-sm-12 col-md-1">
                        <label className="text-data"><strong>{this.state.device.contTravel}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>CARRERAS</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <label className="text-data"><strong>{this.getHrs()}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>TIEMPO CON PASAJE</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-2">
                        <label className="text-data"><strong>{this.state.device.contKm}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>KM EN SERVICIO</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-2">
                        <label className="text-data"><strong>70 km/h</strong></label>
                        <br/>
                        <label className="text-dark"><strong>VELOCIDAD MÁXIMA</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-2">
                        <label className="text-data"><strong>$ {this.contCash()}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>GANANCIAS DEL DÍA</strong></label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <br/><br/>
                        {this.renderMap()}
                    </div>
                    <div className="col-sm-12 col-md-6 text-left">
                    
                        <br/>
                        <center><h2 className="text-white">DATOS DEL TAXI</h2></center>
                        <center><img src={this.state.device.image_url_conductor} className="imgRedonda2" alt="Operador" width="200px"/></center>
                        <table>
                            <tr>
                                <td><img src="../img/driver-icon.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.conductorName} {this.state.device.conductorLastname} </label></strong></td>
                            </tr>
                            <tr>
                                <td><img src="../img/addres-icon.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.conductorAddress} {this.state.device.conductorNumExt} <br/>
                                    col. {this.state.device.conductorDistrict} <br/>
                                    </label></strong>
                                </td>
                            </tr>
                            <tr>
                                <td><img src="../img/vehicle-icon.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.marcaVehicle}, ({this.state.device.modeloVehicle} {this.state.device.anioVehicle}) - {this.state.device.placaVehicle}</label></strong></td>
                            </tr>
                            <tr>
                                <td><img src="../img/cel-icon.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.conductorTel}</label></strong></td>
                            </tr>
                        </table>
                        <center><button className="btn btn-primary btn-sm" onClick={() => this.redirect(this.state.device._id)}><img src="../img/Users-Edit-User-icon-24.png" alt="editar conductor"/> Editar</button></center>
                        <br/>
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
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
        )
    }
}

export default Device;