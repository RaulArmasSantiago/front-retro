import React, {Component} from 'react';
import "./style.css";
import addDevice from '../../services/addDevice'

class FormDevice extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            _id:"",
            name:"",
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
        if(this.state._id !== "" && this.state.name !== ""){
            addDevice(this.state).then((response) => {
                console.log(response.data)
                this.props.history.push('/devices')
            }).catch((err) => {
                console.log(err)
                alert(`Hubo un problema al agregar el dispositivo ${this.state.name}`)
            })
        }
    }

    render(){
        return(
            <div className="row container-fluid justify-content">
                <div className=" col-sm-12 col-md-4 main-login main-center bg-dark">
                    <h2 className="text-white">Registro de dispositivos</h2>
                    <hr/>
					<form onSubmit={this.onFormSubmit}>
						
						<div className="form-group">
							<label htmlFor="id" className="cols-sm-2 control-label sr-only">ID</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="_id" id="_id"  placeholder="ID. Backend Sig Fox" value={this.state.id} onChange={this.onInputCheck}/>
								</div>
							</div>
						</div>
                        
                        <div className="form-group">
							<label htmlFor="name" className="cols-sm-2 control-label sr-only">Nombre</label>
							<div className="cols-sm-10">
								<div className="input-group">
									<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" className="form-control" name="name" id="name"  placeholder="Nombre del dispositivo" value={this.state.name} onChange={this.onInputCheck}/>
								</div>
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

export default FormDevice;