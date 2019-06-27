import React, { Component, Fragment } from 'react';
import allDevices from '../../services/allDevices';
import CardDevice from '../CardDevice/CardDevice';
import './style.css';
import {Link}  from "react-router-dom";
import Nav from '../Nav/Nav';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png'


class Devices extends Component{
    constructor(){
        super()
        this.state = {
            devices:"",
            currentPage:1,
            todosPerPage:10,
            todos:[],
            showModal:true,
            concesion:""
        };
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        /* if(nextProps !== "" && nextProps !== undefined && nextProps !== null){
             this.setState({
                 device: nextProps.device
            })
        } */
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
        console.log(this.state)
        allDevices().then((resp) => {
            //console.log(resp.data)
            this.setState({
                devices:resp.data.data.allDevice,
                todos:resp.data.data.allDevice
            })
            if(this.state.todos !== []){
                setTimeout(() => { this.setState({showModal:false})},1500)
            }
        })
    }



    redirect = (id) => {
        this.props.history.push(`/device/${id}`)
    }
/* 
    renderDevices  = () => {
        
        if(this.state.devices !== ""){
            let devices = this.state.devices.map((device,index)=>{
                return (
                    <CardDevice key={index} device={device} redirect={this.redirect}/>
                )
            })
            return devices 
            
        }else{
            return (
                <div></div>
            )
        }

    }
 */
    onInputCheck = (e) =>{
        let name = e.target.name
        let value = e.target.value
        

        this.setState(
            {[name]:value}
        )
    }

    searchConcesion = () => {
        console.log("Entro al search..")
        if(this.state.devices !== ""){
            this.state.devices.map((dev,index) => {
                if(dev.concesion === this.state.concesion){
                    console.log(dev)
                    let device = []
                    device.push(dev)
                    this.setState({
                        devices: device
                    })
                    console.log(this.state)
                }else{
                    console.log("algo mal")
                }
            })
        }
        
    }

    render(){
        const { todos, currentPage, todosPerPage, concesion } = this.state;
        let renderTodos = "";
        let total;
        if(concesion === ""){
                // Logic for displaying todos
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

            const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

            renderTodos = currentTodos.map((todo, index) => {
                //console.log(todo)
            return (
                <CardDevice key={index} device={todo} redirect={this.redirect}/>
            )
            });

            // Logic for displaying page numbers
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
            }

            total = this.state.devices.length
        }else{
                // Logic for displaying todos
                const indexOfLastTodo = currentPage * todosPerPage;
                const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    
                const currentTodos = todos.slice(0, todos.length);
    
                renderTodos = currentTodos.map((todo, index) => {
                    //console.log(todo)
                    if (concesion !== "" && todo.concesion.indexOf(concesion) === -1){
                        return null
                    }
                return (
                    <CardDevice key={index} device={todo} redirect={this.redirect}/>
                )
                });
    
                // Logic for displaying page numbers
                const pageNumbers = [];
                for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
                pageNumbers.push(i);
                }
    
                total = this.state.devices.length
        }
        console.log(renderTodos)
        return(
            <Fragment>
                <div className="bodyProfile">
                    <Nav/>
                <div className="container">
                
                    <div className="row bodyUser justify-content-center">
                        <div className="col-md-8 text-left"><Link to="/addDevice"><button className="btn btn-success">Agregar concesión</button></Link></div>
                        <div className="col-md-4 text-right">                            
                                <div className="form-group form-inline">
                                    <input className="form-control" type="text" name="concesion" id="concesion" placeholder="Ingresa los 4 digtos de la concesión" required="true" maxLength="4" onChange={this.onInputCheck} value={this.state.concesion}/>
                                </div>
                        </div>
                    </div>
                </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-12">
                                <h3>Todos los Taxis</h3>
                                <br/>
                            </div>
                            <div className="col-sm-12 col-md-10">
                                <table className="table table-sm table-strpied table-hover">
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
                                        hideOnSinglePage={true}
                                        
                                    />
                                </center>
                                        
                            </div>                   
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
            </Fragment>
            
        )
    }
}

export default Devices;