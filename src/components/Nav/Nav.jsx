import React, {Component} from 'react';
import './style.css';
import {Link}  from "react-router-dom"
import payload from '../../resolvers/payload';
import checkToken from '../../resolvers/checkToken';
import TaxiConectado from '../../assets/taxi-conectado.png'
import 'font-awesome/css/font-awesome.min.css';


class Nav extends Component{

    chargeProfile = ()=>{
        if(checkToken()){
            const token = localStorage.getItem('token')
            let pl = payload(token);
            if(pl.admin === true){
                return (
                    <ul className="navbar-nav ml-">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">{pl.name}</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/reports">Taxistas reportados</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                                Servicios
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/dashboard">Tablero</Link>
                                
                                <Link className="dropdown-item" to="/users">Usuarios</Link>
                                <Link className="dropdown-item" to="/devices">Taxis</Link>
                                <a href="#" className="dropdown-item">Reportes</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Cerrar sesión</Link>
                        </li>
                    </ul>
                )
            }else{
                return (
                    <ul className="navbar-nav ml-4" id="items">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">{pl.name}</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/reports">Taxistas reportados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Cerrar sesión</Link>
                        </li>
                    </ul>
                ) 
            }
        }else{
            return(  <ul className="navbar-nav ml-auto" id="items">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        
                    </ul> 
                )
        }
    }

    render () {
        return(
            <nav id="sidebar" className="navbar fixed-top navbar-expand-md bg-dark navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <img src={TaxiConectado} width="100px" alt="logo.png"/>
                    {this.chargeProfile()}
                </div>
                {/* <form className="form-inline my-2 my-lg-0">
                    <div className="input-group md-form form-sm form-2 pl-0">
                        <input className="form-control my-0 py-1 lime-border" type="text" placeholder="Search" aria-label="Search"/>
                        
                        <div className="input-group-append">
                            <span className="input-group-text lime lighten-2" id="basic-text1">
                                <i className="fa fa-search text-grey" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                    </div>
                </form>   */}
            </nav>
        )
    }
}

export default Nav;