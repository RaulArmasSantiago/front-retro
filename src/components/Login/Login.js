import React,{Component} from 'react';
import './style.css';
import login from '../../services/login';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }

    onInpuntCheck = (event) => {
        let name = event.target.name
        let value = event.target.value 

        this.setState({
            [name]:value
        })

    }

    submitForm = (e) => {
        e.preventDefault();
        login(this.state).then((resp) => {
            if(resp.status === 201){
                let token = resp.data.token
                localStorage.setItem('token',token);
                this.props.history.push('/profile')
            }

        }).catch((err) => {
            alert("El usuario o la contraseña son incorrectos.")
            console.log(err)
        })
    }

    render() {

        return(
            <div className="container">
            <div className="row justify-content-center" >
                <div className="col-sm-8 container-fluid">
                    <img src="img/logo_retro.png" alt="retro.png" width="70%"/>
                </div>
            </div>
            <br/>
            <div className="row justify-content-center" >
                <div className="col-xsm-8">
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label for="exampleInputEmail1" className="sr-only">Email address</label>
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onInpuntCheck} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1" className="sr-only">Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.password}  onChange={this.onInpuntCheck} id="exampleInputPassword1" placeholder="Password"/>
                    </div>
  
                    <button type="submit" className="btn btn-dark">Entrar</button>
                </form>       
                </div>
            </div>
            </div>
        )
    }
}

export default Login;



