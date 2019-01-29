import React, { Component } from 'react';
import './style.css';
import records from '../../services/records';
import Nav from '../Nav/Nav';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';


class Records extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            device:"",
            velocidad:[],
            showModal:true
        }
    }

    componentDidMount(){
        records(this.state.id).then((device) => {
            this.setState({device:device.data.data.singleDevice})
            if(this.state.device !== ""){
                setTimeout(() => { this.setState({showModal:false})},1500)
            }
        })
    }

    convertDate(date){
        let strDateTime = date;
        let myDate = new Date(strDateTime);
        let convert = myDate.toLocaleDateString();
        return convert
    }

    getHrs(contmin){
        let hrs = Number(contmin);
        hrs = Math.trunc(hrs/60);
        console.log(hrs * 60);
        let min = Number(contmin)
        let min2 = hrs * 60
        min = min - min2;
        console.log(min)
        let tiempo = String(hrs) + " hrs. " + String(min) + " min.";
        
        return tiempo
    }

    contCash(contEfectivo){
        let efectivo = Number(contEfectivo);

        let efectivoDecimal = efectivo.toFixed(2);
        return efectivoDecimal;
    }

    renderRecords = () => {
        if(this.state.device !== ""){
            let record = this.state.device.records.map((record,index)=>{
                console.log(record._id)
                console.log(index + 1)
                return(
                    <tr>
                        
                        <td>{this.convertDate(record.date)}</td>
                        <td>{record.contTravel}</td>
                        <td>{this.getHrs(record.contTime)}</td>
                        <td>{record.velocidadMaxima}70 km/h</td>
                        <td>$ {this.contCash(record.contEfectivo)}</td>
                    </tr>
                )
            })
            return record
        }
    }

    render(){
        return(
            <div>
            <Nav/>
            <div className="row justify-content-center bodyRecord">
                <div className="col-sm-11">
                <br/>
                    <div className="card">
                        <div className="card-header bg-dark">
                            <h3 className="text-white">Historial {this.state.device.concesion}-T</h3>
                        </div>
                    </div>
                </div>
                <br/>

                <div className=" col-sm-11 table-responsive">
                <center>
                <table className="table table-striped table-hover">
                            <thead className="bg-retroyellow">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Carreras</th>
                                    <th>Tiempo</th>
                                    <th>Velocidad Maxima</th>
                                    <th>Ganancia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRecords()}
                            </tbody>
                        </table>
                        </center>
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
export default Records;