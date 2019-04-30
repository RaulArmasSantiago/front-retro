import React, { Component } from 'react';
import './style.css';
import singleDevice from '../../services/singleDevice';
import Map from '../Map/Map';
import Nav from '../Nav/Nav';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';
import notification from '../../assets/notification.png'
import multas from '../../services/multasConcesion'
import iniTravel from '../../assets/iniTravel.png';
import endTravel from '../../assets/endTravel.png';

let Array=[];
class Device extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            device:"",
            velocidad:[],
            showModal:true,
            multas:"",
            quejas:[],
            visible:"invisible"
        }
    }

    componentDidMount(){
        singleDevice(this.state.id).then((device) => {
            console.log(device)
            //console.log(device.data.data.singleDevice)
            this.setState({device:device.data.data.singleDevice})
            //console.log(this.state)
            //console.log(this.state.device.lastkm - this.state.device.kminit)
            multas(this.state.device.concesion).then((multas) => {
                this.setState({multas:multas.data.data.conceReport})
                //console.log(this.state)
                
            })
            if(this.state.device !== ""){
                setTimeout(() => { this.setState({showModal:false})},1500)
            }
        })

        if(window.screen.availWidth >= 700){
            this.setState({
                visible:""
            })
        }

    }

    contCash(){
        let efectivo = Number(this.state.device.contEfectivo);

        let efectivoDecimal = efectivo.toFixed(2);
        //console.log(efectivoDecimal.toLocaleString())
        return efectivoDecimal;
    }

    renderMap(){
        if(this.state.device !== ""){
            return(
                <div>
                    <Map data={this.state.device.lastLocation} data2={this.state.device.initTravel} data3={this.state.device.endTravel}/>
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
        //console.log(hrs * 60);
        let min = Number(this.state.device.contTime)
        let min2 = hrs * 60
        min = min - min2;
        //console.log(min)
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
        //console.log(velocidad)
        velocidad.porcentaje = (velocidad.vel / 160)*100;
        //console.log(velocidad.porcentaje)
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

        //console.log(velocidad)
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
    
    redirect3 = (id) => {
        this.props.history.push(`/reportTax/${id}`)
    }

    redirect4 = (multas) => {
        this.props.history.push({
            pathname: `/multas/${this.state.device.concesion}`,
            state:{multas:this.state.multas}
        })
        
    }

    getMultas(){
        if (this.state.multas.length !== 0){
            let pendientes=0;

            this.state.multas.map((m)=>{
                if(m.pagado === false){
                    pendientes++;
                }
                return m
            })
            return(
                <div>
                    <button className="reportIMT btn" onClick={() => this.redirect4(this.state.multas)}>Reportes IMT</button>
                </div>
                
            )
        }else{
            return(
            <div></div>
            )
        }
    }

    getQuejas(){
        if (this.state.quejas.length !== 0){
            let pendientes=0;

            this.state.quejas.map((m)=>{
                if(m.pagado === false){
                    pendientes++;
                }
                return m
            })
            return(
                <div>
                    <button className="reportUser btn ml-2" onClick={() => this.redirect4(this.state.multas)}>Reportes por usuarios</button>
                </div>
                
            )
        }else{
            return(
            <div></div>
            )
        }
    }

    getKm(){
        let km = this.state.device.lastkm - this.state.device.kminit;
        return km
    }

    render(){
        return(
            <div className="container-fluid">
            <Nav/>
                <div className="row justify-content-center head">
                    <div className="col-sm-12 col-md-6 text-center">
                        <label className="text-white"><strong>{this.state.device.conductorName} {this.state.device.conductorLastname}</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-2 text-center">
                        <label className="text-white"><strong>{this.state.device.concesion}-T</strong>
                        <button className="btn btn-outline-warning btn-sm ml-4" onClick={() => this.redirect2(this.state.device._id)}>Historial</button>
                        </label>
                    </div>
                    <div className="col-sm-12 col-md-4 text-white">
                        {this.getMultas()}
                        {this.getQuejas()}
                    </div>
                </div>

                <div className="row justify-content-center bodyData">
                    <div className="col-sm-12 col-md-4" id="contenido">
                        <label className="text-data"><strong>{this.state.device.contTravel}</strong></label> 
                        <br/>
                        <label className="text-dark"><strong>CARRERAS</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-4" id="contenido">
                        <label className="text-data"><strong>{this.getHrs()}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>TIEMPO CON PASAJE</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-4" id="contenido">
                        <label className="text-data"><strong>{this.state.device.contKm}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>KM EN SERVICIO</strong></label>
                    </div>
                    <hr className={this.state.visible}/>
                    <div className="col-sm-12 col-md-4" id="contenido">
                        <label className="text-data"><strong>{this.getKm()}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>KM TOTALES</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-2" id="contenido">
                        <label className="text-data"><strong>{this.state.device.velocidadMax} km/h</strong></label>
                        <br/>
                        <label className="text-dark"><strong>MÁXIMA</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-2" id="contenido">
                        <label className="text-data"><strong>{this.state.device.velocidadProm} km/h</strong></label>
                        <br/>
                        <label className="text-dark"><strong>PROMEDIO</strong></label>
                    </div>
                    <div className="col-sm-12 col-md-4" id="contenido">
                        <label className="text-data"><strong>$ {this.contCash()}</strong></label>
                        <br/>
                        <label className="text-dark"><strong>GANANCIAS DEL DÍA</strong></label>
                    </div>
                    <div className="col-md-12" id="contenido">
                        Esta destinado para el boton de panico
                    </div>
                </div>

                <div className="row bodyDataDev">
                    <div className="col-sm-12 col-md-6 text-white">
                        <br/><br/>
                        {this.renderMap()}
                        <br/>
                        <img src={iniTravel} alt=""/>: Inicio de viaje
                        <img className="ml-4" src={endTravel} alt=""/>: Fin de viaje
                        <br/>
                    </div>
                    <div className="col-sm-12 col-md-6 text-left">
                    
                        <br/>
                        <center><h2 className="text-white">DATOS DEL TAXI</h2></center>
                        <center><img src={this.state.device.image_url_conductor} className="imgRedonda2 centered-and-cropped" alt="Operador" width="200px"/></center>
                        <br/>
                        <table className="table font-tabel">
                            <tr>
                                <td><img src="../img/driver-icon.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.conductorName} {this.state.device.conductorLastname} </label></strong></td>
                            </tr>
                            <tr>
                                <td><img src="../img/addres-icon.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.conductorAddress} # {this.state.device.conductorNumExt} <br/>
                                    Col. {this.state.device.conductorDistrict} <br/>
                                    C.P. {this.state.device.conductorCC} <br/>
                                    {this.state.device.conductorCity}, {this.state.device.conductorCountry}
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
                            <tr>
                                <td><img src="../img/phoneHome.png" alt="iconos.png" className="img-fluid"/></td>
                                <td><strong><label className="text-driver ml-2">{this.state.device.conductorTelCasa}</label></strong></td>
                            </tr>
                        </table>
                        <div className="row justify-content-center">
                            <div className="col-sm-6">
                                <button className="btn btn-primary btn-sm" onClick={() => this.redirect(this.state.device._id)}><img src="../img/Users-Edit-User-icon-24.png" alt="editar conductor"/> Editar</button>
                            </div>
                            <div className="col-sm-6 text-rigth">
                                <button className="btn btn-outline-danger btn-sm ml-auto" onClick={() => this.redirect3(this.state.device._id)}>Reportar taxista</button>
                            </div>
                        </div>
                        
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
                                            <img className="d-block w-100 centered-and-cropped" src={this.state.device.image_url_fvehicle} alt="Second slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100 centered-and-cropped" src={this.state.device.image_url_lvehicle} alt="Third slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100 centered-and-cropped" src={this.state.device.image_url_rvehicle} alt="Third slide"/>
                                            </div>
                                            <div className="carousel-item">
                                            <img className="d-block w-100 centered-and-cropped" src={this.state.device.image_url_bvehicle} alt="Third slide"/>
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

                <Modal className="modal-device" isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                    <div className="row">
                    <div className="col-md-12">
                        <center><br/>
                            <img src={TaxiConectado} alt="retro.png" className="img-fluid"/><br/><br/>
                            <br/>
                            <br/>
                            <h3 className="insesion">Cargando...</h3>
                        </center>
                    </div>
                    <div className="col-sm-12">
                        <center>
                            <div className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </center>
                    </div>
                    </div>

                </Modal>
            </div>
        )
    }
}

export default Device;