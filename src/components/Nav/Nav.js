import React, {Component} from 'react';
import './style.css';
import {Link}  from "react-router-dom"
import payload from '../../resolvers/payload';
import checkToken from '../../resolvers/checkToken';


class Nav extends Component{
    constructor(){
        super();
    }

    chargeProfile = ()=>{
        if(checkToken()){
            const token = localStorage.getItem('token')
            let pl = payload(token);
            if(pl.admin === true){
                return (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">{pl.name}</Link>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                                Servicios
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/dashboard">Tablero</Link>
                                <Link className="dropdown-item" to="/users">Usuarios</Link>
                                <Link className="dropdown-item" to="/devices">Taxis</Link>
                                <a className="dropdown-item">Reportes</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Cerrar sesión</Link>
                        </li>
                    </ul>
                )
            }else{
                return (
                    <ul className="navbar-nav ml-auto" id="items">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">{pl.name}</Link>
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
            <nav id="sidebar" className="navbar navbar-expand-md bg-dark navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <img src="./img/taxi-conectado.png" width="100px" alt="logo.png"/>
                    {this.chargeProfile()}
                </div>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-sm btn-outline-light my-2 my-sm-0" type="submit"><img src="../img/search.png" alt=""/></button>
                </form>  
            </nav>
            
        )
    }
}

export default Nav;