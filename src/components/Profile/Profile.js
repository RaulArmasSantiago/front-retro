import React, {Component} from 'react';
import './style.css';
import me from '../../services/me';




class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:"", 
            user:"",
            allDevices:[],
            active:"false"
        }
    }

    componentDidMount(){
        console.log(this.state)
        me().then((user) => {
            console.log(user.data.data.me)
            this.setState({user:user.data.data.me})
            this.setState({id:this.state.user._id,active:"true"})
            console.log(this.state)
        })
    }

    redirect = (id) => {
        console.log(this.state)
        this.props.history.push(`/me/update/${id}`)
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
            <div className="row justify-content">
                <div className="card col-sm-11 container-fluid">
                    <div className="card-body fondo">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <img src={this.state.user.image_url} alt="photo.png" width="200px" className="img-rounded"/>
                        </div>
                        <div className="col-sm-12 col-md-8">
                        <h3>{this.state.user.name} {this.state.user.lastname}</h3>
                        <label><strong>Id usuario:</strong>{this.state.id}</label>
                        {this.state.user.email}<br/>
                        <strong>Telefono:</strong> {this.state.user.telefono}
                        {this.getDireeccion()}
                        <p>
                            
                        </p>
                        <button className="btn btn-primary btn-sm" onClick={() => this.redirect(this.state.user._id)} active={this.state.active}>Editar Perfil <img src="img/Users-Edit-User-icon.png" alt="editprofile.png"/></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Profile;