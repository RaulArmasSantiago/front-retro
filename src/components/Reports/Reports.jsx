import React, {Component} from 'react';
import './style.css';
import allReports from '../../services/allReports';

import Nav from '../Nav/Nav';
import TuplaReport from '../TupleReport/TuplaReport';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';

class Reports extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id:"",
            reportes:[],
            showModal:true
        }
    }

    componentDidMount(){
        allReports().then((report) => {
            this.setState({reportes:report.data.data.allReports})
            console.log(this.state)
            if(this.state.reportes !== []){
                setTimeout(() => { this.setState({showModal:false})},1500)
            }
        })
    }

    redirect = (_id) => {
        console.log(this.state)
        this.props.history.push(`/report/${_id}`)
    }

    renderReport = () =>{
        console.log(this.state.reportes)
        if(this.state.reportes != null){
            let report = this.state.reportes.map((reporte,index) => {
                console.log(reporte,"REPORTE")
                let key = index +1
                return (
                    <TuplaReport reporte={reporte} key={key} redirect={this.redirect}/>
                )
            })
            return report
        }else{
            return(
                <div></div>
            )
        }
    }

    render(){
        return(
            <React.Fragment>
                <Nav/>
                
                <div className="bodyReports">
                    <h3>Historial de taxistas</h3>
                    <br/>
                    <div className="container-fluid">
                        <table className="table table-striped table-hover">
                            <thead className="bg-warning">
                                <tr>
                                    <th>Concesion que reporta</th>
                                    <th>Reportado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderReport()}
                            </tbody>
                        </table>
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
            </React.Fragment>
        )
    }
}

export default Reports;