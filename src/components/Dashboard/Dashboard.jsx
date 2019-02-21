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
                <div className="bodyDashboard">
                    <center><h3>Dashboard Taxi Conectado</h3></center>
                    <br/>
                    <div className="row justify-contenet-center container-fluid">
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
                                    <button className="btn btn-warning" onClick={() => {this.props.history.push('/devices')}}>Ver</button>
                                    <button className="btn btn-warning ml-2" onClick={() => {this.props.history.push('/addDevice')}}>Agregar</button>
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
                                    <button className="btn btn-success" onClick={() => {this.props.history.push('/users')}}>Ver</button>
                                    <button className="btn btn-success ml-2" onClick={() => {this.props.history.push('/addUser')}}>Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Dashboard;