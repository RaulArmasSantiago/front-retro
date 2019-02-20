import React, {Component, Fragment} from 'react';
import './style.css';
import {Link} from "react-router-dom"
import Nav from '../Nav/Nav';
import taxi from '../../assets/taxi.png';
import user from '../../assets/user.png';
import allDevices from '../../services/allDevices';
import allUsers from '../../services/allUsers';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            devices:"",
            users:"",
        }
    }

    componentDidMount(){
        allDevices().then((dev) => {
            console.log(dev)
            this.setState({
                devices:dev.data.data.allDevice
            })
            console.log(this.state)
        })

        allUsers().then((usr) => {
            this.setState({
                users:usr.data.data.allUsers
            })
        })
    }

    render(){
        return(
            <Fragment>
                <Nav/>
                <div className="bodyDashboard container-fluid">
                    <center><h3>Dashboard Taxi Conectado</h3></center>
                    <div className="row container-fluid justify-contenet-center">
                        <div className="col-sm-12 col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Taxis registrados</h5>
                                </div>
                                <div className="card-body bg-warning text-white">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <img src={taxi} alt=""/>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="font-long">{this.state.devices.length}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-white">
                                    <button className="btn btn-warning">Ver</button>
                                    <button className="btn btn-warning ml-2">Agregar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                        <div className="card">
                                <div className="card-header">
                                    <h5>Usuarios registrados</h5>
                                </div>
                                <div className="card-body bg-success text-white">
                                <div className="row">
                                        <div className="col-sm-6">
                                            <img src={user} alt=""/>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="font-long">{this.state.users.length}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-white">
                                    <button className="btn btn-success">Ver</button>
                                    <button className="btn btn-success ml-2">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row justify-content-center bg-white">
                    <div className="col-md-4">
                        
                    </div>
                    <div className="col-md-8">
                        hola
                    </div>

                    <div className="col-xsm-11 col-md-4 ml-3">
                    <div className="card">
                        <div className="card-header bg-dark">
                        <Link to="/devices"><h4 className="card-title color">Taxis</h4></Link>
                        </div>
                            
                    </div>
                    <br/>
                    </div>
                    <div className="col-xsm-11 col-md-4 ml-3">
                    <div className="card">
                        <div className="card-header bg-dark">
                            <Link className="link link-hover" to="/addUser"><h4 className="card-title color">Usuarios</h4></Link>
                        </div>
                        <div className="card-body bg-retro text-left text-white">
                            <ul>
                                <Link className="link link-hover" to="/users"><li>Ver Usuarios</li></Link>
                                <Link className="link link-hover" to="/addUser"><li>Agregar usuarios</li></Link>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Dashboard;