import React, {Component} from 'react';
import './style.css';
import me from '../../services/me';
import CardDevice from '../CardDevice/CardDevice';
import BtnCollaborator from '../BtnCollaborator/BtnCollaborator';
import Nav from '../Nav/Nav';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';
import taxi from '../../assets/taxi_animado.gif'
import loading from '../../assets/loading2.gif'

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id:"", 
            user:"",
            allDevices:[],
            active:"false",
            typeBtn:"",
            img:"../../img/preload.png",
            showModal:true
        }
    }

    

    componentDidMount(){
        me().then((user) => {
            if(user !== null){
                this.setState({
                    user:user.data.data.me
                })
    
                if(this.state.user !== ""){
                    setTimeout(() => { this.setState({showModal:false})},1500)
                }
                console.log(this.state)
            }else{
                localStorage.removeItem('token')
                this.props.history.push('/')
            }
            
        }).catch((err) =>{
            localStorage.removeItem('token')
            this.props.history.push('/')
        })

        if(window.screen.availWidth <= 500){
            this.setState(
                {
                    typeBtn:"btn btn-circleSmall",
                }
            )
        }else{
            this.setState(
                {
                    typeBtn:"btn btn-circleMed",
                }
            )
        }
    }

    redirect2 = (id) => {
        this.props.history.push(`/device/${id}`)
    }

    redirect3 = (id) => {
        this.props.history.push(`/addColaborador/${id}`)
    }
    renderDevices = () => {
        if(this.state.user !== ""){
            let devices = this.state.user.devices.map((device,index) => {
                return (
                    <CardDevice device={device} redirect={this.redirect2} key={index}/>
                )
            })
            return devices
        }else{
            return(
                <div></div>
            )
        }
    }

    renderCollaborators = () => {
        if(this.state.user !== ""){
            let colaborador = this.state.user.collaborators.map((collaborator,index) =>{
                //console.log(this.state.user.devices)
                return (
                    <BtnCollaborator colaborador={collaborator} devices={this.state.user.devices} key={index}/>
                )
            })
            return colaborador
        }else{
            return(
                <div></div>
            )
        }
    }

    redirect = (_id) => {
        //console.log(this.state)
        this.props.history.push(`/me/update/${_id}`)
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

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
        console.log(this.state)
    }

    render() {
        return(
            
            <div className="bodyProfile">
                <Nav/>    
                <div className="row bodyUser justify-content-center">
                    <div className="col-sm-12">
                        <img src={this.state.user.image_url} alt="img_profile" className="imgRedonda"/><br/>
                        <h4>{this.state.user.name} {this.state.user.lastname}</h4>
                        Concesionario
                        <br/>
                        <button className="btn bg-retroyellow btn-sm" onClick={() => this.redirect(this.state.user._id)} active={this.state.active}>Editar Perfil</button>
                        <button className="btn bg-retroyellow btn-sm ml-2" onClick={() => this.props.history.push('/misReportes')} active={this.state.active}>Mis reportes</button>
                        <br/>
                        <hr/>
                    </div>

                    <div className="col-sm-12">
                        <h6>Colaboradores</h6>
                        {this.renderCollaborators()}
                        
                        <button className={this.state.typeBtn} onClick={() => this.redirect3(this.state.user._id)}><i class="fa fa-user-plus" aria-hidden="true"></i></button>
                        <hr/>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <h3>OPERADORES</h3>
                        </div>
                        <div className="col-sm-12">
                            <table className="table table-sm table-striped table-hover">
                                <tbody>
                                    {this.renderDevices()}
                                </tbody>
                            </table>
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
export default Profile;