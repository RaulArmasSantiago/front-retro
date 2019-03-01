import React, {Component} from 'react';
import './style.css';
import singleReports from '../../services/singleReport';
import Modal from 'react-modal';
import TaxiConectado from '../../assets/taxi-conectado.png';

import Nav from '../Nav/Nav';


class Report extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            reporte:"",
            showModal:true

        }
    }

    componentDidMount(){
        singleReports(this.state.id).then((reporte) => {
            this.setState({reporte:reporte.data.data.singleReport})
            console.log(this.state)
            if(this.state.reporte !== ""){
                setTimeout(() => { this.setState({showModal:false})},1500)
            }
        })
    }

    getDate(){
        let date = new Date(this.state.reporte.create_at);
        console.log(date)
        console.log(date.toJSON())
        return date.toJSON();
    }

    renderComments = () => {
        if(this.state.reporte !== ""){
            let devices = this.state.reporte.comments.map((commetn,index) => {
                return (
                    <tr>
                        <td className="text-left">{commetn}</td>
                    </tr>
                )
            })
            return devices
        }else{
            return(
                <div></div>
            )
        }
    }

    render(){
        return(
            <div className="bodyReport">
                <Nav/>
                <br/>
                <div className="row reportBody continer">
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
                        <br/><br/>
                    </div>
                    
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Commentarios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderComments()}
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

            </div>
        )
    }
}

export default Report;