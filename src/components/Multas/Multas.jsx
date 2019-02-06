import React,{Component} from 'react';
import './style.css';
import Nav from "../Nav/Nav"
import { array } from 'prop-types';
let Array = [];
class Multas extends Component{
    
    constructor(props){
        super(props);
        this.state={
            multas:this.props.location.state.multas,
            pendientes:[],
        }
    }

    componentDidMount(){
        console.log(Array)
        console.log(this.state)
        console.log(this.props.location.state.multas)

    }

    getDate(fecha){
        let date = new Date(fecha).toJSON()
        let re = /T/g;
        let result = date.replace(re, " ")
        let year = result.substring(0,4)
        let month = result.substring(5,7)
        let day = result.substring(8,10)
        let cita=`${day}/${month}/${year} - ${result.substring(10,16)}`
        return cita;
    }

    getMultas = () =>{
        if(this.state.multas.length !== 0){
            this.state.multas.map((m) =>{
                if(m.pagado === false){
                    Array.push(m)
                }
            })
        }
        
        if(Array.length !== 0){
            console.log("ENTO")
            let multa=Array.map((multa)=>{
                if (multa.cita_report === null){
                    return(
                        <tr>
                            <td>{multa.folio}</td>
                            <td>{multa.title_report}</td>
                            <td>{multa.descripcion_report}</td>
                            <td>{this.getDate(multa.fecha_report)}</td>
                            <td>Pendiente por asignar</td>
                        </tr>
                    )
                }else{
                    return (
                        <tr>
                            <td>{multa.folio}</td>
                            <td>{multa.title_report}</td>
                            <td>{multa.descripcion_report}</td>
                            <td>{this.getDate(multa.fecha_report)}</td>
                            <td>{this.getDate(multa.cita_report)}</td>
                        </tr>
                    )
                }
                
            })
            return multa
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
                <div className="multasBody">
                    <h3>Multas</h3>
                    <br/>
                    <div className="row justify-content-center container-fluid">
                    <center>
                        <div className="col-sm-12 col-md-12">
                            
                            <table className="table table-striped table-responsive">
                                <thead className="bg-warning">
                                    <tr>
                                        <th>Folio</th>
                                        <th>Titulo</th>
                                        <th>Description</th>
                                        <th>Fecha del reporte</th>
                                        <th>Cita IMT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getMultas()}        
                                </tbody>
                            </table>

                        </div>
                        </center>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Multas;