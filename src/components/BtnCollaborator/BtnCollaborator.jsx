import React,{Component} from 'react';
import './style.css';
import Modal from 'react-modal';
import RowConcesion from '../RowConcesion/RowConcesion';
import RowConcesionColaborador from '../RowConcesionColaborador/RowConcesionColaborador';
import addDevicesColaborador from '../../services/updateDevColaborador'


let array= []
let array2 =[]
class BtnCollaborator extends Component{
    constructor(props){
        super(props);
        this.state = {
            colaborador:props.colaborador,
            devices:props.devices,
            arrayDev:'',
        }
    }

    

    componentDidMount(){
        let concesiones=[]
        if(window.screen.availWidth <= 500){
            this.setState(
                {
                    typeText:"text-longest",
                    typeImg:"img-longest mr-2"
                }
            )
        }else{
            this.setState(
                {
                    typeText:"text-medium",
                    typeImg:"img-medium mr-2"
                }
            )
        }
        this.state.colaborador.devices.map((device,index) => {
            array2.push(device._id, index)
        })
        

    }
    
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    addArray =(id) => {
        let indice = array.indexOf(id)
        if( indice === -1){
            array.push(id)
        }else{
            array.splice(indice,1)
        }

        
    }


    renderConceColaborador= () => {
        //console.log(this.state.colaborador.devices.length)
        if(this.state.colaborador.devices.length !== 0){
            let devices = this.state.colaborador.devices.map((device,index) => {
                return (
                    <RowConcesionColaborador device={device} key={index}/>
                )
            })
            return devices
        }else{
            return(
                <div>
                    <p>Aun no se han asignado concesiones a este colaborador.</p>
                </div>
            )
        }
    }

    renderConcesiones = () => {
        if(this.state.devices !== ""){
            let devices = this.state.devices.map((device,index) => {
                if(array2.indexOf(device._id) >= 0){
                    return(
                        <div key={index}></div>
                    )
                }else{
                    return (
                        <RowConcesion device={device} onCheckBox={this.addArray} key={index}/>
                    )
                }
            })
            return devices
        }else{
            return(
                <div></div>
            )
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if(array.length > 0){
            //alert("Entro al si")
            array.map((dev,index) =>{
                addDevicesColaborador(this.state.colaborador._id,dev).then((user) =>{
                    window.location.reload()
                }).catch((err) =>{
                    return err
                })
            })
        }else{
            alert("Selecciones por lo menos una concesion")
        }
    }

    render(){
        return(
            <React.Fragment>
                <img src={this.state.colaborador.image_url} className={this.state.typeImg} alt={this.state.colaborador.name} onClick={this.handleOpenModal}/>
                <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example" className="modalColaborador">
                    <div className="container-fluid">
                        <button className="btn btn-danger" onClick={this.handleCloseModal}>x</button>
                    </div>
                    
                    <div className="row justify-content-center">
                    
                        <div className="col-md-12">
                            <center><br/>
                                <img src={this.state.colaborador.image_url} alt="retro.png" className="img-fluid imgRedonda"/><br/><br/>
                            </center>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <center>
                            <div className="col-sm-12">
                                {this.state.colaborador.name} <br/>
                                {this.state.colaborador.email} <br/>
                                {this.state.colaborador.telefono} <br/>
                                {this.state.colaborador.street} {this.state.colaborador.numExt}, Col. {this.state.colaborador.district} <br/>
                                <cite>{this.state.colaborador.city}, {this.state.colaborador.country}</cite>
                                <br/>
                                <br/>
                            </div>
                        </center>
                        

                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-6">
                                <div className="card">
                                    <div className="card-header bg-dark text-white">
                                        Asignar dispositivos
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.onFormSubmit}>
                                        <button type="submit"  className="btn btn-yellow btn-block">Asignar</button>
                                        <br/>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Concesión</th>
                                                    <th className="text-center">Selecciona</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderConcesiones()}
                                            </tbody>
                                        </table>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="card">
                                    <div className="card-header bg-dark text-white">
                                        Dispositivos asignados
                                    </div>
                                    <div className="card-body">
                                    <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Concesión</th>
                                                    <th className="text-center">Operador</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderConceColaborador()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </Modal>
            </React.Fragment>
        )
    }
}

export default BtnCollaborator;