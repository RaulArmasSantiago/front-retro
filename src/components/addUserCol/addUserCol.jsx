import React,{Component, Fragment} from 'react';
import Nav from '../Nav/Nav'
import './style.css'
import Modal from 'react-modal';
import addUser from '../../services/addUser'


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

    onInputCheck = (e) =>{
        let name = e.target.name
        let value = e.target.value
        

        this.setState(
            {[name]:value}
        )
    }

    validatePasswords(password,verify_password){
        console.log(password,verify_password);  
        if(password === verify_password){
            return true
        }else{
            return alert("Tu password no coincide");
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        
        if(this.validatePasswords(this.state.password,this.state.checkPassword)){
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
            this.props.history.push('/profile')
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
                            <form onSubmit={this.onFormSubmit}>
                            <br/><br/>
                                <div className="row justify-content-center container-fluid">
                                    <div className="col-sm-12 col-md-10 form-group text-left">
                                        <label htmlFor="">Nombre</label>
                                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-10 form-group text-left">
                                        <label htmlFor="">E-mail</label>
                                        <input className="form-control" type="text" name="email" id="email" value={this.state.email} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-5 form-group text-left">
                                        <label htmlFor="">Password</label>
                                        <input className="form-control" type="text" name="password" id="password" value={this.state.password} onChange={this.onInputCheck}/>
                                    </div>
                                    <div className="col-sm-12 col-md-5 form-group text-left">
                                        <label htmlFor="">Confirmar password</label>
                                        <input className="form-control" type="text" name="checkPassword" id="checkPassword" value={this.state.checkPassword} onChange={this.onInputCheck}/>
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