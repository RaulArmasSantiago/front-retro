import React, {Component,Fragment} from 'react';
import "./style.css";
import addUser from '../../services/addUser'
import Nav from '../Nav/Nav';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png'

class FormUser extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            name:"",
            lastname:"",
            email:"",
            password:"",
            check_password:"",
            is_admin:false,
            showModal:true,
            showModal2:false
        }
    }

    componentWillMount(){
        setTimeout(() => { this.setState({showModal:false})},1500)
    }

    toggle = (e) => {
        this.setState({
            is_admin: !this.state.is_admin
        })
        console.log(this.state)
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value
        

        this.setState(
            {[name]:value}
        )
        console.log(this.state)
    }

    validatePasswords(password,verify_password){
        if(password === verify_password){
            return true
        }else{
            return alert("Tu password no coincide");
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.validatePasswords(this.state.password,this.state.check_password)){
            let respuesta = addUser(this.state).then((response) => {
                console.log(response.data)
                this.setState({
                    showModal2:true
                })
                
            }).catch((err) => {
                console.log(err)
                alert("Hubo un problema")
            });

            console.log(respuesta)
        }
    }

    render(){
        return(
            <Fragment>
                <Nav/>

                <div className="bodyAddUser container">
                    <h4>Registro de usuarios</h4>
                    <br/>
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <h3>Datos del usuario</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <div className="form-group text-left">
                                                    <label htmlFor="" className="">Nombre</label><span className="input-group-addon ml-2"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                                    <input type="text" name="name" id="name" className="form-control" placeholder="Nombre" value={this.state.name} onChange={this.onInputCheck}/>
                                                    
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12">
                                                <div className="form-group text-left">
                                                    <label htmlFor="" className="">E-mail</label><span className="input-group-addon ml-2"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                                                    <input type="text" name="email" id="email" className="form-control" placeholder="Apellido" value={this.state.email} onChange={this.onInputCheck}/>        
                                                </div>
                                            </div>

                                            <br/>

                                            <div className="col-sm-12 col-md-6">
                                                <div className="form-group text-left">
                                                    <label htmlFor="" className="">Password</label><span className="input-group-addon ml-2"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                                    <input type="text" name="password" id="password" className="form-control" placeholder="Apellido" value={this.state.password} onChange={this.onInputCheck}/>        
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-6">
                                                <div className="form-group text-left">
                                                    <label htmlFor="" className="">Repetir password</label><span className="input-group-addon ml-2"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                                    <input type="text" name="check_password" id="check_password" className="form-control" placeholder="Apellido" value={this.state.check_password} onChange={this.onInputCheck}/>        
                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="confirm" className="cols-sm-2 control-label">¿Es administrador?</label>
                                                    <div className="cols-sm-10">
                                                        <label className="switch">
                                                            <input type="checkbox" name="is_admin" value={this.state.is_admin} onClick={this.toggle}/>
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="form-group ">
                                            <button type="submit" className="btn btn-yellow btn-lg btn-block login-button">Registrar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal className="modal-main" isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                    <div className="row">
                    <div className="col-md-12">
                        <center><br/>
                            <img src={TaxiConectado} alt="retro.png" className="img-fluid"/><br/><br/>
                            <br/>
                            <br/>
                            <h3 className="insesion">Cargando...</h3>
                        </center>
                    </div>
                    <div className="col-sm-12">
                        <center>
                            <div className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </center>
                    </div>
                    </div>

                </Modal>

                <Modal className="modal-main" isOpen={this.state.showModal2} contentLabel="Minimal Modal Example">
                    <div className="row">
                        <div className="col-md-12">
                            <center><br/>
                                <img src={TaxiConectado} alt="retro.png" className="img-fluid"/><br/><br/>
                                <br/>
                                <br/>
                                <h3 className="insesion">Usuario registrado con exito!!!</h3>
                                <br/>
                                <button className="btn btn-yellow btn-block" onClick={()=>{this.props.history.push('/dashboard')}}>Ok</button>
                            </center>
                        </div>
                    </div>

                </Modal>
            </Fragment>
        )
    }
}

export default FormUser;