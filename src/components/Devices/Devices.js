import React, { Component } from 'react';
import allDevices from '../../services/allDevices';
import CardDevice from '../CardDevice/CardDevice';
import './style.css'




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
            <div className="row justify-content-center">
                <div className="text-center">
                <p>
                    <h3 className="movies-title text-center">Todos los  Dispositivos</h3>
                </p>
                </div>
                <div className="row">
                    {this.renderDevices()}
                </div>
                
                
            </div>
        )
    }
}

export default Devices;