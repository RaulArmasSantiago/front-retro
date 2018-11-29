import React, { Component } from 'react';
import './style.css'

class CardDevice extends Component{
    constructor(props){
        super(props);
        this.state = {
            device:props.device,
            typeText:"",
            typeImg:""
        }
    }

    componentDidMount(){
        if(window.screen.availWidth <= 500){
            this.setState(
                {
                    typeText:"text-longest",
                    typeImg:"img-longest"
                }
            )
        }else{
            this.setState(
                {
                    typeText:"text-medium",
                    typeImg:"img-medium"
                }
            )
        }
    }

    render(){
        console.log(this.state.device)
        return(

            <tr onClick={() => this.props.redirect(this.state.device._id)}>
                <td className="alingFoto"><img src={this.state.device.image_url_conductor} alt="Operador" className={this.state.typeImg}/></td>
                <td>
                    <div id="contenido">
                        <p className={this.state.typeText}><b>{this.state.device.conductorName} {this.state.device.conductorLastname}</b><br/>
                        <cite>{this.state.device.modeloVehicle} {this.state.device.anioVehicle}</cite></p>
                    </div>
                </td>
                <td>
                    <button className="btn-sm btn-yellow border"><strong className={this.state.typeText}>{this.state.device.concesion}-T</strong></button>
                </td>
                <td>
                    <img src="../img/arrow-right.png" alt=""/>
                </td>
            </tr>
        )
        /*
        <div className="row">
                                <div className="col-sm-1">
                                    <img src={this.state.device.image_url_conductor} alt="Operador" className="imgRedondacard"/>
                                </div>
                                <div className="col-sm-8">
                                    <strong>{this.state.device.conductorName} {this.state.device.conductorLastname}</strong><br/>
                                    <cite>{this.state.device.modeloVehicle} {this.state.device.anioVehicle}</cite>
                                </div>
                                <div className="col-sm-3">
                                    <button className="btn- btn-yellow border"><strong>{this.state.device.concesion}-T</strong></button>
                                </div>
                            </div>
        
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
        )*/
    }
}

export default CardDevice;

/*
<div className="row">
                <div className="col-sm-12">
                    <a onClick={() => this.props.redirect(this.state.device._id)} class="list-group-item list-group-item-action">
                    <div className="row">
                                <div className="col-sm-12">
                                        <tr>
                                            <td><img src={this.state.device.image_url_conductor} alt="Operador" className="imgRedondacard"/></td>
                                            <td>
                                                <strong className="text-longest">{this.state.device.conductorName} {this.state.device.conductorLastname}</strong><br/>
                                                <cite className="text-longest">{this.state.device.modeloVehicle} {this.state.device.anioVehicle}</cite>
                                            </td>
                                            <td>
                                                <button className="btn-sm btn-yellow border"><strong className="text-longest">{this.state.device.concesion}-T</strong></button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                    </a>
                </div>
            </div>
            */