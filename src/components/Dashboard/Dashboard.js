import React, {Component} from 'react';
import './style.css';
import {Link} from "react-router-dom"

class Dashboard extends Component{
    constructor(){
        super('foo');
    }

    render(){
        return(
            <div className="container-fluid ">
                <div className="row justify-content-center">
                    <div className="col-xsm-11 col-md-4 ml-3">
                    <div className="card">
                        <div className="card-header bg-dark">
                        <Link to="/devices"><h4 className="card-title color">Taxis</h4></Link>
                        </div>
                        <div className="card-body text-left text-white bg-retro">
                            <ul>
                                <Link className="link link-hover" to="/devices"><li>Ver taxis</li></Link>
                                <Link className="link link-hover" to="/addDevice"><li>Agregar taxi</li></Link>
                            </ul>
                            
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
            </div>
        )
    }
}
export default Dashboard;