import React,{Component, Fragment} from 'react';
import Nav from '../Nav/Nav'
import './style.css'
import Modal from 'react-modal';


class addUserCol extends Component{
    constructor(props){
        super(props);
        this.state= {
            name:"",
            email:"",
            password:"",
            checkPassword:"",
            isadmin:false
        }
    }

    render(){
        return(
            <Fragment>
                <Nav/>
                <div className="bodyAddUC container">
                    <h3>Resgistro colaborador</h3>
                    <br/>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            Datos del colaborador
                        </div>
                        <div className="car-body">
                            <form action="">
                            <br/><br/>
                                <div className="row justify-content-center container-fluid">
                                    <div className="col-sm-12 col-md-10 form-group text-left">
                                        <label htmlFor="">Nombre</label>
                                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-10 form-group text-left">
                                        <label htmlFor="">E-mail</label>
                                        <input className="form-control" type="text" name="email" id="email" value={this.state.name} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-5 form-group text-left">
                                        <label htmlFor="">Password</label>
                                        <input className="form-control" type="text" name="password" id="password" value={this.state.name} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-5 form-group text-left">
                                        <label htmlFor="">Confirmar password</label>
                                        <input className="form-control" type="text" name="checkPassword" id="checkPassword" value={this.state.name} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <br/><br/>
                                        <button type='submit' className="btn btn-yellow btn-block">Registrar</button>
                                        <br/><br/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default addUserCol;