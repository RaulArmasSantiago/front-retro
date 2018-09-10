import React, {Component} from 'react';
import "./style.css";
import addUser from '../../services/addUser'

class FormUser extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            name:"",
            lastname:"",
            email:"",
            password:"",
            check_password:"",
            is_admin:false 
        }
    }

    componentWillMount(){
        console.log(this.state);
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
            alert("Tu password no coincide")
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.validatePasswords(this.state.password,this.state.check_password)){
            addUser(this.state).then((response) => {
                console.log(response.data)
                this.props.history.push('/dashboard')
            }).catch((err) => {
                console.log(err)
                alert("Hubo un problema")
            })
        }
    }

    render(){
        return(
            <div className="row container-fluid justify-content">
                <div className=" col-sm-12 col-md-4 main-login main-center bg-dark">
                    <h2 className="text-white">Registro de usuarios</h2>
                    <hr/>
					<form onSubmit={this.onFormSubmit}>
						
						<div className="form-group">
							<label htmlFor="name" className="cols-sm-2 control-label sr-only">Nombre</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="name" id="name"  placeholder="Nombre" value={this.state.name} onChange={this.onInputCheck}/>
								</div>
							</div>
						</div>
                        
                        <div className="form-group">
							<label htmlFor="name" className="cols-sm-2 control-label sr-only">Apellido</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="lastname" id="lastname"  placeholder="Apellido(s)" value={this.state.lastname} onChange={this.onInputCheck}/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email" className="cols-sm-2 control-label sr-only">Email</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="email" className="form-control" name="email" id="email"  placeholder="example@mail.com" value={this.state.email} onChange={this.onInputCheck}/>
                                </div>
                            </div>
                        </div>

						<div className="form-group">
							<label htmlFor="password" className="cols-sm-2 control-label sr-only">Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="password" id="password"  placeholder="Password" value={this.state.password} onChange={this.onInputCheck}/>
								</div>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label sr-only">Confirm Password</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" className="form-control" name="check_password" id="check_password"  placeholder="Confirmar Password" value={this.state.check_password} onChange={this.onInputCheck}/>
								</div>
							</div>
						</div>
                        
                        <div className="form-group">
							<label htmlFor="confirm" className="cols-sm-2 control-label">¿Es administrador?</label>
							<div className="cols-sm-10">
                                <label className="switch">
                                    <input type="checkbox" name="is_admin" value={this.state.is_admin} onClick={this.toggle}/>
                                    <span className="slider round"></span>
                                </label>
							</div>
						</div>


						<div className="form-group ">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Registrar</button>
						</div>
					</form>
				</div>
                <div className="col-sm-12 col-md-7 card">
                <br/>
                    <img src="img/retrolg.png" alt="retro.png"/>
                    <hr/>
                    <p className="text-justify"> El taximetro retro cuenta con los estandares y normas de acreditacion necesarias para poder ser un producto de calidad y confiable.</p>
                </div>
            </div>
        )
    }
}

export default FormUser;