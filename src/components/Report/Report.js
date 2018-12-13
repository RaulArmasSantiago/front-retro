import React, {Component} from 'react';
import './style.css';
import singleReports from '../../services/singleReport';

import Nav from '../Nav/Nav';


class Report extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            reporte:""
        }
    }

    componentDidMount(){
        singleReports(this.state.id).then((reporte) => {
            this.setState({reporte:reporte.data.data.singleReport})
            console.log(this.state)
        })
    }

    getDate(){
        let date = new Date(this.state.reporte.create_at);
        console.log(date)
        console.log(date.toJSON())
        return date.toJSON();
    }


    render(){
        return(
            <div className="bodyReport">
                <Nav/>
                <br/>
                <div className="row justify-content-center container">
                    <div className="col-sm-12 col-md-6">
                        <img src={this.state.reporte.img_url} alt="" width="300"/>
                        <h3></h3>
                    </div>
                    <div className="col-sm-12 col-md-6 text-left">
                        <center><h2>Reporte del conductor</h2></center>
                        <br/>
                        <h3><strong>{this.state.reporte.name} {this.state.reporte.lastname}</strong></h3>
                        <label htmlFor=""><strong>Reportado por la concesion:</strong></label>&nbsp;
                        <label htmlFor="">{this.state.reporte.reporter}-T</label><br/>
                        <strong>Motivo del reporte:</strong>
                        <br/>
                        <textarea className="form-control" name="" id="" cols="30" rows="5" value={this.state.reporte.description} disabled="true">
                        </textarea>
                        <label><strong>Fecha de creacion del reporte:</strong></label>
                        <input type="text" className="form-control" name="" id="" value={this.getDate()} disabled="true"/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Report;