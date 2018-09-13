import React, { Component} from 'react';
import './style.css';
import {Link}  from "react-router-dom"
import checkToken from '../../resolvers/checkToken';
import payload from '../../resolvers/payload';

class Home extends Component{
    constructor(){
        super()
    }

    chargeProfile = () => {
        if(checkToken()){
            const token = localStorage.getItem('token')
            let pl = payload(token);
            if(pl.admin === true){
                return(
                    <div>
                        <h1>Bienvenido</h1>
                    </div>
                )
            }else{
                return(
                    <div>
                        <h1>Bienvenido</h1>
                        <p>Tu como concesionario podras ver la ultima geolocalizacion de las unidades registrads bajo tu nombre.</p>
                    </div>
                )
            }
        }else{
            return(
                <div>
                    <p>
                    <div className="col-sm-8 container-fluid">
                        <img src="img/logo_retro.png" alt="retro.png" width="70%"/>
                    </div>
                    </p>
                    
                    <p>
                    <div className="row show-grid container-fluid">
                        <div className="col-sm-12">
                            <Link to="/login"><button className="btn btn-dark" width="30%">Iniciar Sesión</button></Link>
                        </div>
                    </div>
                    </p>
                    <img src="img/retro.jpeg" alt="retro.png" width="60%"/>
                </div>
            )
        }
    }   

    render(){
        return(
            <div>
                {this.chargeProfile()}
            </div>
        )
    }
}

export default Home;