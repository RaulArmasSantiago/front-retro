import React, {Component} from 'react';
import './style.css';
import me from '../../services/me';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:"",
            user:"",
            allDevices:[]
        }
    }

    componentDidMount(){
        me().then((user) => {
            console.log(user.data.data.me)
            this.setState({user:user.data.data.me})
        })
    }


    render() {
        return(
            <div className="row justify-content">
                <div className="card col-sm-11 container-fluid">
                    <div className="card-body fondo">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <img src="http://placehold.it/300x300" alt="" className="img-rounded"/>
                        </div>
                        <div className="col-sm-12 col-md-8">
                        <h3>{this.state.user.name} {this.state.user.lastname}</h3>
                        <cite>Prol. Diamante 5b, Unidad y progreso</cite><br/>
                        <cite>Xalapa, Veracruz</cite><br/>
                        <p>
                            
                        </p>
                        <button className="btn btn-primary">Editar Perfil <img src="img/Users-Edit-User-icon.png" alt="editprofile.png"/></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Profile;