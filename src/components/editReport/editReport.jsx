import React, {Component, Fracment} from 'react';
import './style.css';
import Nav from '../Nav/Nav';
import singleReport from '../../services/singleReport'
import addComment from '../../services/addComment'
import updateReport from '../../services/updateReport'

class editReport extends Component{
    constructor(props){
        super(props);
        this.state={
            id:props.match.params.id,
            report:"",
            comment:"",
            status:""
        }
    }

    componentDidMount(){
        singleReport(this.state.id).then((report)=>{
            this.setState({
                report:report.data.data.singleReport,
                status:report.data.data.singleReport.status
            })
            console.log(this.state)    
        })
        
    }
    
    getDate(){
        let date = new Date(this.state.report.create_at);
        //console.log(date)
        //console.log(date.toJSON())
        return date.toJSON();
    }

    renderComments = () => {
        if(this.state.report !== ""){
            let devices = this.state.report.comments.map((commetn,index) => {
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
    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState(
            {[name]:value}
        )
        console.log(this.state)
    }

    onFormSubmitStatus = (e) => {
        e.preventDefault();
        if(this.state.status !== ""){
            updateReport(this.state).then((report) => {
                console.log(report);
                return report
                
            }).catch((err) => {
                alert("Hubo un problema al actulizar el reporte")
            })

        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        if(this.state.comment !== ""){
            addComment(this.state).then((comment) => {
                console.log(comment);
                setTimeout(() => { window.location.reload()},500)
            }).catch((err) => {
                alert("Hubo un problema al agregar tu comentario")
            })

        }
        
    }

    render(){
        return(
            <React.Fragment>
                <Nav/>
                <div className="bodyEditReport">
                <center><h2>Reporte del conductor</h2></center>
                    <div className="row container-fluid">
                        <div className="col-sm-12 col-md-6">
                            <img src={this.state.report.img_url} alt="" width="300"/>
                            <h3></h3>
                        </div>
                        <div className="col-sm-12 col-md-6 text-left">
                            
                            <br/>
                            <h3><strong>{this.state.report.name} {this.state.report.lastname}</strong></h3>
                            <label htmlFor=""><strong>Reportado por la concesion:</strong></label>&nbsp;
                            <label htmlFor="">{this.state.report.reporter}-T</label><br/>
                            
                            <div className="form-group">
                                <strong>Motivo del reporte:</strong>
                                <br/>
                                <textarea className="form-control" name="" id="" cols="30" rows="5" value={this.state.report.description} disabled="true">
                                </textarea>
                            </div>
                            
                            <div className="form-group">
                                <label><strong>Fecha de creacion del reporte:</strong></label>
                                <input type="text" className="form-control" name="" id="" value={this.getDate()} disabled="true"/>
                            </div>
                            <form onSubmit={this.onFormSubmitStatus}>
                                <div className="form-group">
                                    <label htmlFor="">Situación del problema</label>

                                    <select className="form-control" name="status" value={this.state.status} onChange={this.onInputCheck}>
                                        <option value="0">--Seleccione una opcion--</option>
                                        <option value="Activo">Activo</option>
                                        <option value="Resuelto">Resuelto</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-yellow btn-block">Actualizar reporte</button>
                            </form>    
                            
                            <br/><br/>
                        </div>
                        
                    </div>
                    <hr/>
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
                            <br/> <br/>
                            <form onSubmit={this.onFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="">Agrega un comentario:</label>
                                    <textarea className="form-control" name="comment" id="comment" cols="30" rows="5" value={this.state.comment} onChange={this.onInputCheck}></textarea>
                                </div>
                                <input type="submit" value="Cometar" className="btn btn-yellow"/>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default editReport;