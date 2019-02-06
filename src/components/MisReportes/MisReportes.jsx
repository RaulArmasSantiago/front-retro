import React, {Component} from 'react';
import './style.css'
import Modal from 'react-modal'
import misReports from '../../services/misReports';
import Nav from '../Nav/Nav';

class MisReportes extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal:true,
            reports:"",

        }
    }

    componentDidMount(){
        misReports().then((report) =>{
            this.setState({
                reports:report.data.data.me
            })
            console.log(this.state)
        })
    }

    redirect = (id) => {
        this.props.history.push(`/editReport/${id}`)
    }

    renderReport = () => {
        if(this.state.reports !== ""){
            let report = this.state.reports.reporters.map((report) => {
                return (
                    <tr>
                        <td>{report.name}</td>
                        <td>{report.description}</td>
                        <td>{report.reporter}</td>
                        <td>{report.status} <br/><button className="btn btn-yellow" onClick={() => this.redirect(report._id)}> Editar </button></td>
                    </tr>
                )
            })
            return report
        }else{
            return (
                <div></div>
            )
        }
    }
    render(){
        return(
            <React.Fragment>
                <Nav/>
                <div className="container-fluid bodymReport">
                    <table className="table table-striped">
                        <thead className="bg-warning">
                        <tr>
                            <th className="text-center">Nombre del reportado</th>
                            <th className="text-center">Motivo del reporte</th>
                            <th className="text-center">Concesion que reporto</th>
                            <th className="text-center">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderReport()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default MisReportes;