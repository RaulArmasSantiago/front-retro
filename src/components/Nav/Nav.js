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
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Dropdown link
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                <a className="dropdown-item" href="#">Usuarios</a>
                                <a className="dropdown-item" href="#">Dispositivos</a>
                                <a className="dropdown-item" href="#">Reportes</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </ul>
                )
            }else{
                return (
                    <ul className="navbar-nav ml-auto" id="items">
                        <li className="nav-item">
                            <Link className="nav-link" to="/info">Inforación de las conceciones.</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">{pl.name}</Link>
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
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <Link className="navbar-brand" to="/"><img src="img/retro_BCO.png" width="100px" alt="logo.png"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    {this.chargeProfile()}
                </div>  
            </nav>
            
        )
    }
}

export default Nav;