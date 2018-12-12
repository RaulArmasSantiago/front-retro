import React, {Component} from 'react';
import './style.css';
import allReports from '../../services/allReports';

import Nav from '../Nav/Nav';
import TuplaReport from '../TupleReport/TuplaReport';

class Reports extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id:"",
            reportes:[],
        }
    }

    componentDidMount(){
        allReports().then((report) => {
            this.setState({reportes:report.data.data.allReports})
            console.log(this.state)
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
            <div className="bodyReports">
                <Nav/>
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
        )
    }
}

export default Reports;