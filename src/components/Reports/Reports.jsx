import React, {Component} from 'react';
import './style.css';
import allReports from '../../services/allReports';
import Nav from '../Nav/Nav';
import TuplaReport from '../TupleReport/TuplaReport';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';
import allName from '../../services/allNameReport';


class Reports extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id:"",
            reportes:[],
            showModal:true,
            conductor:""
        }
    }

    componentDidMount(){
        allReports().then((report) => {
            this.setState({reportes:report.data.data.allReports})
            //console.log(this.state)
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
        //console.log(this.state.reportes)
        if(this.state.reportes != null){
            let report = this.state.reportes.map((reporte,index) => {
                if (this.state.conductor !== "" && reporte.name.indexOf(this.state.conductor) === -1){
                    return null
                }
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
    
    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value
        
        
        //console.log(this.state)
        console.log(value)
        this.setState(
            {[name]:value}
        )
        //console.log(this.state)
    }

    onFormSerch = (e) =>{
        e.preventDefault();
        allName(this.state.conductor).then((resp) => {
            console.log(resp)
            this.setState({
                reportes: resp.data.data.allName
            })
        })
    }

    render(){
        return(
            <React.Fragment>
                <Nav/>
                
                <div className="bodyReports">
                    <h3>Historial de taxistas</h3>
                    <br/>
                    <div className="col-sm-12">
                            <form onSubmit={this.onFormSerch}>
                                <div className="form-group form-inline ml-auto">
                                    <label htmlFor=""></label>
                                    <input className="form-control ml-auto" type="text" name="conductor" id="conductor" placeholder="Nombre o apellido del conductor" value={this.state.conductor} onChange={this.onInputCheck} size="30"/>
                                    <button className="btn btn-yellow ml-2" type="submit">Buscar</button>
                                </div>
                            </form>
                            
                        
                        <br/>
                    </div>
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
            </React.Fragment>
        )
    }
}

export default Reports;