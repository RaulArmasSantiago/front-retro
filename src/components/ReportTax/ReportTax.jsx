import React, {Component} from 'react';
import singleDriver from '../../services/singleDevice';
import Nav from '../Nav/Nav'
import './style.css'
import addReport from '../../services/addReport';
import me from '../../services/me';

class Report extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            driver:"",
            name:"",
            lastname:"",
            description:"",
            concesion:"",
            img_url:"",
            me:""
        }
    }

    componentDidMount(){
        me().then((user) => {
            //console.log(user)
            this.setState({
                me:user.data.data.me
            })
        })
        singleDriver(this.state.id).then((driver) => {
            this.setState({driver:driver.data.data.singleDevice})
            console.log(this.state)
            this.setState(
                {
                    name: this.state.driver.conductorName,
                    lastname: this.state.driver.conductorLastname,
                    concesion: this.state.driver.concesion,
                    img_url:this.state.driver.image_url_conductor
                }
            )
        })
        console.log(this.state)
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState(
            {[name]:value}
        )
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        addReport(this.state).then((response) => {
            console.log(response.data)
            this.props.history.push('/profile')
        })
    }

    render(){
        return(
            <div className="bodyReport">
                <Nav/>
                <br/>
                <h3>Reportar Taxista</h3>
                <br/>
                <div className="row container-fluid">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <h4>Reportar</h4>
                            </div>
                            <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="row">
                                
                                    <div className="col-sm-12 col-md-6">
                                        <img src={this.state.img_url} className="img-fluid imgRedondaRep" alt="" width="400px"/>
                                    </div>
                                    <div className="col-sm-12 col-md-6 text-left">
                                        <center><h4>Datos del taxista</h4></center>
                                        
                                        <div className="form-group">
                                            <label htmlFor="name">Nombre:</label>
                                            <input type="text" name="name" id="name" className="form-control" placeholder="Nombre del taxista" value={this.state.name} onChange={this.onInputCheck}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Apellidos</label>
                                            <input type="text" className="form-control" name="lastname" id="" placeholder="Apellidos" value={this.state.lastname} onChange={this.onInputCheck}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Motivo del reporte:</label>
                                            <textarea name="description" className="form-control
                                            " id="" cols="20" rows="5" placeholder="Menciona cual es el motivo por el cual se levanta el reporte al conductor..." value={this.state.description} onChange={this.onInputCheck}></textarea>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Concesion que reporta: </label>
                                            <input type="text" className="form-control" name="concesion" id="" placeholder="Numero de la concesión" value={this.state.concesion} onChange={this.onInputCheck}/>
                                        </div>

                                        <button className="btn btn-danger btn-block">Levantar Reporte</button>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
    
}

export default Report;

