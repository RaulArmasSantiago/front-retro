import React,{Component} from 'react';
import './style.css';
import Modal from 'react-modal';

class BtnCollaborator extends Component{
    constructor(props){
        super(props);
        this.state = {
            colaborador:props.colaborador
        }
    }

    componentDidMount(){
        if(window.screen.availWidth <= 500){
            this.setState(
                {
                    typeText:"text-longest",
                    typeImg:"img-longest"
                }
            )
        }else{
            this.setState(
                {
                    typeText:"text-medium",
                    typeImg:"img-medium"
                }
            )
        }
    }
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render(){
        return(
            <React.Fragment>
                <img src={this.state.colaborador.image_url} className="imgRedondasm mr-2" alt={this.state.colaborador.name} onClick={this.handleOpenModal}/>
                <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example" className="modalColaborador">
                    
                    <div className="row justify-content-center">
                    <button className="btn btn-danger ml-auto" onClick={this.handleCloseModal}>x</button>
                        <div className="col-md-12">
                            <center><br/>
                                <img src={this.state.colaborador.image_url} alt="retro.png" className="img-fluid imgRedonda"/><br/><br/>
                            </center>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                    <center>
                        <div className="col-sm-12">
                            {this.state.colaborador.name} {this.state.colaborador.lastname} <br/>
                            {this.state.colaborador.email} <br/>
                            {this.state.colaborador.telefono} <br/>
                            {this.state.colaborador.street} {this.state.colaborador.numExt}, Col. {this.state.colaborador.district} <br/>
                            <cite>{this.state.colaborador.city}, {this.state.colaborador.country}</cite>
                        </div>
                    </center>
                    </div>
                
                </Modal>
            </React.Fragment>
        )
    }
}

export default BtnCollaborator;