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

    componentWillReceiveProps(nextProps){
        if(nextProps !== "" && nextProps !== undefined && nextProps !== null){
             this.setState({
                 device: nextProps.device
            })
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
        //console.log(this.state.device)
        return(
  
            <tr onClick={() => this.props.redirect(this.state.device._id)}>
                <td className="alingFoto"><img src={this.state.device.image_url_conductor} alt="Operador" className={`centered-and-cropped ${this.state.typeImg}`}/></td>
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
    }
}

export default CardDevice;