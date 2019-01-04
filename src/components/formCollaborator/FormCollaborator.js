import React,{ Component } from 'react';
import './style.css'
import Nav from '../Nav/Nav';
import singleMail from '../../services/singleUserMail';
import allUsers from '../../services/allUsers';
import image from 'react-firebase-file-uploader/lib/utils/image';
import addCollaborator from '../../services/addColaborator';

class FormCollaborator extends Component {
    constructor(props){
        super(props);
        this.state={
            _id:this.props.match.params.id,
            email:'',
            image:'../img/load.png',
            user:'',
            visible:'invisible',
            visiblediv:'col-sm-12 col-md-6 invisible',
            name:'',
            lastname:'',
            photo:'',
            idcolaborador:''
        }
        
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value
        //console.log(this.state)
 
        this.setState(
            {[name]:value}
        )
        //console.log(this.state)
    }

    search = (e) => {
        singleMail(this.state.email).then((user,err)=>{
            console.log(user.data.data.singleUserMail)
            this.setState({
                image:'../img/load.png',
                visible:'visible ml-2',
                user: user.data.data.singleUserMail
            })

            if(this.state.user !== null && this.state.user !== undefined){

                this.setState({
                    image:'../img/ok.png',
                    name:this.state.user.name,
                    lastname:this.state.user.lastname,
                    photo:this.state.user.image_url,
                    idcolaborador:this.state.user._id,
                    visiblediv:'col-sm-12 col-md-6'
                })
            }else{
                this.setState({image:'../img/cancel.png',visiblediv:'col-sm-12 col-md-6 invisible'})
            }
        }).catch((err)=>{
            console.log(err)
        });
        
    } 

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.state.idcolaborador !== "" && this.state.name !== ""){
            addCollaborator(this.state).then((response) => {
                console.log(response.data)
                this.props.history.push('/profile')
            }).catch((err) => {
                console.log(err)
                alert(`Hubo un problema al agregar a ${this.state.name} a su lista de colaboradores :(, intentelo mas tarde.`)
            })
        }
    }

    render(){
        return(
            <div>
                <Nav/>
                <div className="bodyFC container-fluid">
                    <div className="card">
                        <div className="card-header text-white bg-dark">
                            <h3>Agregar colaboradores</h3>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-sm-12 col-md-6">
                                    <h5>Buscar Colaborador.</h5>
                                        <br/>
                                        <div className="form-group form-inline">
                                            <input className="form-control" type="text" name="email" id="email" placeholder="Email del colaborador" onChange={this.onInputCheck} value={this.state.email}/>
                                            <button type="submit" className="btn btn-success ml-3" onClick={this.search}><i class="fa fa-search" aria-hidden="true"/> Buscar</button>    
                                            <img className={this.state.visible} src={this.state.image} alt=""/>
                                        </div>
                                        
                                    <hr/>
                                    {/* <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                            </tr>        
                                        </thead>
                                        <tbody>
                                            {this.renderUser()}
                                        </tbody>

                                    </table> */}
                                </div>
                                <div className={this.state.visiblediv}>
                                <form onSubmit={this.onFormSubmit}>
                                    <div>
                                        <img src={this.state.photo} className="imgRedonda"/>
                                    </div>
                                    <br/>
                                    <div className="form-group form-inline">
                                        <label htmlFor="" className="col-md-3">Nombre:</label>
                                        <input type="text" className="form-control ml-1" value={this.state.name}/>
                                    </div>
                                    <div className="form-group form-inline">
                                        <label htmlFor="" className="col-md-3">Apellido:</label>
                                        <input type="text" className="form-control ml-1" value={this.state.lastname}/>
                                    </div>

                                    <input type="submit" className="btn btn-yellow btn-block" value="Agregar colaborador"/>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormCollaborator;