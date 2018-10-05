import React, {Component} from 'react';
import './style.css';
import me from '../../services/me';
import CardDevice from '../CardDevice/CardDevice';

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
            this.setState({user:user.data.data.me})
            
            console.log(this.state)
            console.log(this.state.user.devices._id)
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
            <div>
                <div className="row">
                    <div className="card col-sm-12 container-fluid">
                        <div className="card-body fondo">
                        <div className="row">
                            <div className="col-sm-12 col-md-4">
                                <img src={this.state.user.image_url} alt="photo.png" width="200px" className="img-rounded"/>
                            </div>
                            <div className="col-sm-12 col-md-8">
                            <h3>{this.state.user.name} {this.state.user.lastname}</h3>
                            <label><strong>Id usuario:</strong>{this.state.user._id}</label><br/>
                            {this.state.user.email}<br/>
                            <strong>Telefono:</strong> {this.state.user.telefono}
                            {this.getDireeccion()}
                            <p>
                                
                            </p>
                            <button className="btn btn-primary btn-sm" onClick={() => this.redirect(this.state.user._id)} active={this.state.active}>Editar Perfil <img src="../img/Users-Edit-User-icon.png" alt="editprofile.png"/></button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                
                <br/><br/>
                <div className="container-fluid">
                    <div className="row">
                        {this.renderDevices()}
                    </div>
                </div>
            
            </div>
        )
    }

}
export default Profile;