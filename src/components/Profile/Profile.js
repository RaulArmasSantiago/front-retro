import React, {Component} from 'react';
import './style.css';
import me from '../../services/me';
import CardDevice from '../CardDevice/CardDevice';
import Nav from '../Nav/Nav';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id:"", 
            user:"",
            allDevices:[],
            active:"false"
        }
    }

    componentDidMount(){
        me().then((user) => {
            console.log(user)
            this.setState({user:user.data.data.me})
            
            console.log(this.state)
        })
    }

    redirect2 = (id) => {
        this.props.history.push(`/device/${id}`)
    }

    renderDevices = () => {
        if(this.state.user !== ""){
            let devices = this.state.user.devices.map((device,index) => {
                return (
                    <CardDevice device={device} redirect={this.redirect2}/>
                )
            })
            return devices
        }else{
            return(
                <div></div>
            )
        }
    }

    redirect = (_id) => {
        console.log(this.state)
        this.props.history.push(`/me/update/${_id}`)
    }

    getDireeccion(){
         if(this.state.user.street === null && this.state.user.district === null){
             return(
                 <div>
                     <cite>Informacion incompleta, para completar su perfil pulse Editar Perfil</cite>
                 </div>
             )
         }else{
             return(
                 <div>
                    <cite>{this.state.user.street} {this.state.user.numExt}, Col. {this.state.user.district}</cite><br/>
                    <cite>{this.state.user.city}, {this.state.user.country}</cite><br/>
                 </div>
             )
         }
    }

    
    render() {
        return(
            
            <div className="bodyProfile">
                <Nav/>    
                <div className="row bodyUser justify-content-center">
                    <div className="col-sm-12">
                        <img src={this.state.user.image_url} alt="img_profile" className="imgRedonda"/><br/>
                        <h4>{this.state.user.name} {this.state.user.lastname}</h4>
                        Concesionario
                        <br/>
                        <button className="btn bg-retroyellow btn-sm" onClick={() => this.redirect(this.state.user._id)} active={this.state.active}>Editar Perfil</button>
                        <br/>
                        <hr/>
                    </div>
                    <div className="col-sm-12">
                    <h6>Colaboradores</h6>
                    <img src={this.state.user.image_url} alt="img-colaborador" className="imgRedondasm"/>
                    <hr/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <h3>OPERADORES</h3>
                        </div>
                        <div className="col-sm-12">
                            <table className="table table-sm table-striped table-hover">
                                <tbody>
                                    {this.renderDevices()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Profile;