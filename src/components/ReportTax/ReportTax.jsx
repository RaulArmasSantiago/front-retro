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
            description:"",
            concesion:"",
            img_url:"",
            me:"",
            direccion:""
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
            let calle = this.state.driver.conductorAddress;
        let numE = this.state.driver.conductorNumExt
        let numI = this.state.driver.conductorNumInt;
        let col = this.state.driver.conductorDistrict;
        let cc = this.state.driver.conductorCC;
        let tel = this.state.driver.conductorTel;
        let city = this.state.driver.conductorCity
        let country =this.state.driver.conductorCountry
        let dir = `${calle}, #${numE}, Int.${numI}, Col. ${col}, CP. ${cc}, ${city}, ${country}`;
            this.setState(
                {
                    name: this.state.driver.conductorName,
                    lastname: this.state.driver.conductorLastname,
                    concesion: this.state.driver.concesion,
                    img_url:this.state.driver.image_url_conductor,
                    direccion: dir
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

    getAddress() {
        let calle = this.state.driver.conductorAddress;
        let numE = this.state.driver.conductorNumExt
        let numI = this.state.driver.conductorNumInt;
        let col = this.state.driver.conductorDistrict;
        let cc = this.state.driver.conductorCC;
        let tel = this.state.driver.conductorTel;
        let city = this.state.driver.conductorCity
        let country =this.state.driver.conductorCountry
        let dir = `${calle}, #${numE}, Int.${numI}, Col. ${col}, CP. ${cc}, ${city}, ${country}`;
        
        return dir
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
                                <h4>Reportar taxista</h4>
                            </div>
                            <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                                <div className="row">
                                
                                    <div className="col-sm-12 col-md-6">
                                        <img src={this.state.img_url} className="img-fluid imgRedondaRep centered-and-cropped" alt=""/><br/>
                                        <label htmlFor="">{this.state.name}</label> <br/>
                                        <cite>{this.getAddress()}</cite>
                                    </div>
                                    <div className="col-sm-12 col-md-6 text-left">
                                        <center><h4>Reporte</h4></center>
                                        <div className="form-group">
                                            <label htmlFor="">Concesion que reporta: </label>
                                            <input type="text" className="form-control" name="concesion" id="" placeholder="Numero de la concesión" value={this.state.concesion} onChange={this.onInputCheck}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Motivo del reporte:</label>
                                            <textarea name="description" className="form-control" id="" cols="20" rows="5" placeholder="Menciona cual es el motivo por el cual se levanta el reporte al conductor..." value={this.state.description} onChange={this.onInputCheck}></textarea>

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

