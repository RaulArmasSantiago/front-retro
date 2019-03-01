import React, {Component, Fragment} from 'react';
import './style.css';
import allUsers from '../../services/allUsers';
import CardUser from '../CardUser/CardUser';
import Nav from '../Nav/Nav';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png'
import {Link} from "react-router-dom";

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            users:'',
            currentPage:1,
            todosPerPage:10,
            todos:[],
            showModal:true
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
        allUsers().then((resp) => {
            console.log(resp.data)
            this.setState({
                users:resp.data.data.allUsers,
                todos:resp.data.data.allUsers
            })
            if(this.state.todos !== []){
                setTimeout(() => { this.setState({showModal:false})},1500)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    redirect = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    /* renderUsers = () => {
        console.log(this.state)
        if(this.state.users !== ""){
            let users = this.state.users.map((user,key) => {
                return(
                    <CardUser user={user} redirect={this.redirect}/>
                )
            })
            return users;
        }else{
            return(
                <div></div>
            )
        }
    } */

    render(){

        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            console.log(todo)
        return (
            <CardUser user={todo} redirect={this.redirect}/>
        )
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i);
        }

        let total = this.state.users.length

        return(
            <Fragment>
                <Nav/>
                <div className="bodyUsers container-fluid">
                    <h3>Usuarios Registrados</h3>
                    <div className="row">
                        <div className="col-md-8 text-left"><Link to="/addUser"><button className="btn btn-success">Nuevo usuario</button></Link></div>
                    </div>
                    <div className="row justify-content-center">
                        {renderTodos}
                        <br/><br/>
                        <Pagination 
                            showSizeChanger
                            onChange={this.onChange} 
                            current={this.state.currentPage} 
                            total={total}
                            hideOnSinglePage={true}
                            
                        />
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
            </Fragment>
        )
    }
}

export default Users;