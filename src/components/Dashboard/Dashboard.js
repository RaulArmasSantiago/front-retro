import React, {Component} from 'react';
import './style.css';
import {Link} from "react-router-dom"

class Dashboard extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-xsm-11 col-md-4 ml-3 card">
                        <div className="card-header bg-dark">
                        <Link to="/devices"><h4 className="card-title color">Dispisitivo</h4></Link>
                        </div>
                        <div className="card-body">
                            <Link to="/addDevice"><button className="btn btn-primary"><img src="img/device.png" alt="device.jpg"/></button></Link>
                        </div>
                    </div>
                    <div className="card col-xsm-11 col-md-4 ml-3">
                        <div className="card-header bg-dark">
                            <Link to="/addUser"><h4 className="card-title color">Usuarios</h4></Link>
                        </div>
                        <div className="card-body">
                        <Link to="/addUser"><button className="btn btn-primary"><img src="img/addusers.png" alt="device.jpg"/></button></Link>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-xsm-11 col-md-4 ml-3 card">
                        <div className="card-header bg-dark">
                        <Link to="/devices"><h4 className="card-title color">Reportes</h4></Link>
                        </div>
                        <div className="card-body bg-red">
                            <Link to="/addDevice"><img src="img/device.png" alt="device.jpg"/></Link>
                        </div>
                    </div>
                    <br/>
                    <div className="card col-xsm-11 col-md-4 ml-3">
                        <div className="card-header bg-dark">
                            <Link to="/addUser"><h4 className="card-title color">Agregar Usuarios</h4></Link>
                        </div>
                        <div className="card-body bg-red">
                        <Link to="/addUser"><img src="img/addusers.png" alt="device.jpg"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;