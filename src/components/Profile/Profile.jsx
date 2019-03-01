import React, {Component, Fragment} from 'react';
import './style.css';
import me from '../../services/me';
import CardDevice from '../CardDevice/CardDevice';
import BtnCollaborator from '../BtnCollaborator/BtnCollaborator';
import Nav from '../Nav/Nav';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

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
            showModal:true,
            currentPage:1,
            todosPerPage:10,
            todos:[]
        }
    }

    onChange = (page) => {
        console.log(page);
        this.setState({
            currentPage: page,
            showModal:true
        });

        setTimeout(() => { this.setState({showModal:false})},1000)
    }    

    componentDidMount(){
        //console.log("HEROKU")
        me().then((user) => {
            if(user !== null){
                this.setState({
                    user:user.data.data.me,
                    todos:user.data.data.me.devices
                })
    
                if(this.state.user !== ""){
                    setTimeout(() => { this.setState({showModal:false})},1500)
                }
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

        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
        return (
            <CardDevice key={index} device={todo} redirect={this.redirect2}/>
        )
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i);
        }

        let total = this.state.todos.length

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button
                className="btn btn-yellow ml-1 btn-sm"
                key={number}
                id={number}
                onClick={this.handleClick}
                >
                {number}
                </button>
            );
        });

        return(
            <Fragment>
            <div className="bodyProfile">
                <Nav/>    
                <div className="row bodyUser justify-content-center">
                    <div className="col-sm-12">
                        <img src={this.state.user.image_url} alt="img_profile" className="imgRedonda"/><br/>
                        <h4>{this.state.user.name}</h4>
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
                        
                        <button className={this.state.typeBtn} onClick={() => this.redirect3(this.state.user._id)}><i className="fa fa-user-plus" aria-hidden="true"></i></button>
                        <hr/>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <h3>OPERADORES</h3>
                        </div>
                        <div className="col-sm-12">
                            <table className="table table-sm table-striped table-hover">
                                <tbody>
                                    {renderTodos}
                                </tbody>
                            </table>

                            <br/><br/>
                            <center>
                                <Pagination 
                                    showSizeChanger
                                    onChange={this.onChange} 
                                    current={this.state.currentPage} 
                                    total={total}
                                    showTitle={true}
                                />
                            </center>
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
            </div>
            </Fragment>
        )
    }

}
export default Profile;