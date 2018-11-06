import React, { Component } from 'react';
import allDevices from '../../services/allDevices';
import CardDevice from '../CardDevice/CardDevice';
import './style.css';
import {Link}  from "react-router-dom";



class Devices extends Component{
    constructor(){
        super()
        this.state = {devices:''}
    
    }

    componentDidMount(){
        allDevices().then((resp) => {
            console.log(resp.data)
            this.setState(
                {devices:resp.data.data.allDevice}
            )
        }).catch((err) => {
            console.log(err)
        })

    }

    redirect = (id) => {
        this.props.history.push(`/device/${id}`)
    }

    renderDevices  = () => {
        console.log(this.state)
        if(this.state.devices !== ""){
            let devices = this.state.devices.map((device,index)=>{
                return (
                    <CardDevice device={device} redirect={this.redirect}
                     
                    />
                )
            })
            return devices 
            
        }else{
            return (
                <div></div>
            )
        }

    }
    render(){
        return(
            <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-left"><Link to="/addDevice"><button className="btn btn-success">Agregar concesión</button></Link></div>
                    <div className="col-md-4 text-right">
                        <form action="">
                            <div className="form-group form-inline">
                                <input className="form-control" type="text" name="concesion" id="concesion" placeholder="Ingresa los 4 digtos de la concesión" required="true" maxLength="4"/>
                                <button className="btn btn-success btn-sm ml-2" onClick><img src="../img/search-icon.png" alt=""/></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="text-center col-sm-12">
                        <h3 className="devices-title text-center">Todos los Taxis</h3>                        
                    </div>                    
                </div>
            </div>
                <div className="container-fluid">
                     <div className="row justify-content-center">
                        {this.renderDevices()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Devices;