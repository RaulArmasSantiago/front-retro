import React,{Component} from 'react';
import './style.css';
import login from '../../services/login';
import checkToken from '../../resolvers/checkToken';
import payload from '../../resolvers/payload';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';
import Copete from '../../assets/copete.png';
import icons from '../../assets/iconosLog.png';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            showModal: false
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
            this.handleCloseModal()
            alert("El usuario o la contraseña son incorrectos.")
            console.log(err)
        })
    }

    chargeProfile = () => {
        if(checkToken()){
            const token = localStorage.getItem('token')
            let pl = payload(token);
            return(
                this.props.history.push('/profile')
            )
        }else{
            return(
                <div className="container">
                    <img src={Copete} alt="retro.png" className="img-fluid"/>
                    <br/><br/>
                <div className="row justify-content-center" >
                    <div className="col-sm-8 col-md-10 container-fluid animated fadeIn delay-2s">
                        <img src={TaxiConectado} alt="retro.png" className="img-fluid"/>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-center" >
                    <div className="col-sm-12 col-md-4">
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label for="exampleInputEmail1" className="text-left fontlalogin">Email</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onInpuntCheck} id="exampleInputEmail1"/>
                        </div>
                        <div className="form-group">
                            <label className="text-left fontlalogin">Contraseña</label>
                            <input type="password" className="form-control" name="password" value={this.state.password}  onChange={this.onInpuntCheck} id="exampleInputPassword1"/>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn btn-yellow" onClick={this.handleOpenModal}>Entrar</button>
                    </form>       
                    </div>
                </div>
                <br/>
                <img src={icons} alt="iconos.png" className="img-fluid animated slower delay-2s animated bounceInDown"/>
                </div>
            )
        }
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    windows = () =>{
        let h = window.screen.availHeight;
        let w = window.screen.availWidth;
        return `El tamaño de la pantalla es de : ${w} x ${h}`
    }
    

    render() {
        return(
            <div className="bodyLogin">
                {this.chargeProfile()}

                <Modal className="modal-main" isOpen={this.state.showModal} contentLabel="Minimal Modal Example" className="Modal">
                <div className="row">
                    <div className="col-md-12">
                        <center><br/>
                            <img src={TaxiConectado} alt="retro.png" className="img-fluid"/><br/><br/>
                            <h3 className="insesion">Iniciando Sesión ...</h3>
                        </center>
                    </div>
                    <div className="col-sm-12">
                    <center>
                        <div class="lds-spinner">
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
            </div>
        )
        
    }
}

export default Login;



