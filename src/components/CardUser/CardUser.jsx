import React, {Component} from 'react';

class CardUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:props.user,
            rol:""
        }
    }

    getAdmin = () => {
        let rol
        if(this.state.user.is_admin === true){
            this.setState({
                rol: "Administrador"
            })
        }else{
            this.setState({
                rol: "Concesionario"
            })
        }

    }

    render(){
        
        return (
            <div className="col-sm-12 col-md-4 col-lg-3" style={{width: "14rem;"}}>
            <div className="card">
                <div className="card-body bg-dark text-white">
                    <img src={this.state.user.image_url} alt="user" className="imgRedonda"/>
                    <br/><br/>
                    <h5>{this.state.user.name} {this.state.user.lastname}</h5>
                    <cite id="ccuser" style={{fontSize:'15px'}}>{this.state.user.email}</cite><br/>
                    <label htmlFor="">Taximetros Asociados: <br/>{this.state.user.devices.length}</label>
                </div>
                <div className="card-footer bg-warning">
                    <button className="btn btn-dark" onClick={() => this.props.redirect(this.state.user._id)}> Ver usuario</button>
                </div>
            </div>
            <br/>
            </div>
        )
    }
}

export default CardUser;