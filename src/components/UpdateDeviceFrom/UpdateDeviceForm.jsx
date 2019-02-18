import React, {Component} from 'react';
import "./style.css";
import updateDevice from '../../services/updateDevice';
import updateDevMov from '../../servicesCM/updateDevice';
import singleDevice from '../../services/singleDevice';
import singleDeviceCM from '../../servicesCM/singleDeviceConcesion';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';
import Nav from '../Nav/Nav';

class UpdateDeviceForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            _id:props.match.params.id,
            device:"",
            marcaVehicle:"",
            modeloVehicle:"",
            anioVehicle:"",
            placaVehicle:"",
            image_url_fvehicle:"",
            image_url_lvehicle:"",
            image_url_rvehicle:"",
            image_url_bvehicle:"",
            image_url_conductor:"",
            conductorName:"",
            conductorLastname:"",
            conductorAddress:"",
            conductorDistrict:"",
            conductorcc:"",
            conductorNumExt:"",
            conductorNumInt:"",
            conductorTel:"",
            concesion:"",
            user:"",
            sigfox:"",
            idCM:""
        }
    }

    componentDidMount(){
        singleDevice(this.state._id).then((device) => {
            console.log(device.data.data.singleDevice)
            this.setState({device:device.data.data.singleDevice})
            this.setState({
                conductorName:this.state.device.conductorName,
                conductorLastname:this.state.device.conductorLastname,
                marcaVehicle:this.state.device.marcaVehicle,
                modeloVehicle: this.state.device.modeloVehicle,
                anioVehicle:this.state.device.anioVehicle,
                placaVehicle:this.state.device.placaVehicle,
                conductorAddress:this.state.device.conductorAddress,
                conductorDistrict:this.state.device.conductorDistrict,
                conductorcc:this.state.device.conductorCC,
                conductorNumExt:this.state.device.conductorNumExt,
                conductorNumInt:this.state.device.conductorNumInt,
                conductorCity:this.state.device.conductorCity,
                conductorCountry:this.state.device.conductorCountry,
                conductorTel:this.state.device.conductorTel,
                concesion:this.state.device.concesion,
                image_url_bvehicle:this.state.device.image_url_bvehicle,
                image_url_conductor:this.state.device.image_url_conductor,
                image_url_fvehicle:this.state.device.image_url_fvehicle,
                image_url_lvehicle:this.state.device.image_url_lvehicle,
                image_url_rvehicle:this.state.device.image_url_rvehicle,
                sigfox:this.state.device.sigfox,
                name:this.state.device.name
            })
            singleDeviceCM(this.state.concesion).then((dev) => {
                console.log(dev)
                this.setState({
                    idCM:dev.data.data.conceDevice
                })
                console.log(this.state)
            })
            
            
            
        })
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value

        this.setState(
            {[name]:value}
        )
        //console.log(this.state)
    }

    onFormSubmit = (e) => {
         e.preventDefault();
         updateDevice(this.state).then((response) => {
             console.log("entro chido")
             console.log(response.data )
             if(this.state.conductorCity === "Saltillo"){
             updateDevMov(this.state).then((response) => {
                console.log(response.data)
                this.props.history.push(`/device/${this.state._id}`)
             })
            }else{
                this.props.history.push(`/device/${this.state._id}`)
            }
         })
    }

    handleUploadSuccess = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url_conductor:url})
            })

    }

    handleUploadSuccessFv = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url_fvehicle:url})
            })

    }

    handleUploadSuccessLv = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url_lvehicle:url})
            })

    }

    handleUploadSuccessRv = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url_rvehicle:url})
            })

    }

    handleUploadSuccessBv = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url_bvehicle:url})
            })

    }

    render(){
        return(
            <div>
                <Nav/>
                <div className="bodyUpdateDev container-fluid">
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h3>Actualizacion de la concesión</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onFormSubmit}>
                            <div className="row">
                                <div className="col-sm-12 bg-dark text-white">
                                    <h5>Datos de la concesión</h5>
                                </div>
                                
                                <div className="col-sm-12 col-md-4 text-left">
                                    <br/><br/>
                                    <div className="form-group">
                                        <label htmlFor="concesion">Concesion</label>
                                        <input type="text" className="form-control" name="concesion" id="concesion" value={this.state.concesion} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="marcaVehicle" >Marca</label>
                                        <input type="text" className="form-control" name="marcaVehicle" id="marcaVehicle" value={this.state.marcaVehicle} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="modeloVehicle" >Modelo</label>
                                        <input type="text" className="form-control" name="modeloVehicle" id="modeloVehicle" value={this.state.modeloVehicle} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="anioVehicle" >Modelo</label>
                                        <input type="text" className="form-control" name="anioVehicle" id="anioVehicle" value={this.state.anioVehicle} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="placaVehicle" >Placas</label>
                                        <input type="text" className="form-control" name="placaVehicle" id="placaVehicle" value={this.state.placaVehicle} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                </div>
                                
                                <div className="col-sm-12 col-md-8">
                                <br/><br/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <img src={this.state.image_url_fvehicle} width="200px" alt=""/>
                                                <br/><br/>
                                                <label className="btn btn-warning">
                                                Agregar foto delantera
                                                    <FileUploader
                                                        hidden
                                                        accept="image/*"
                                                        randomizeFilename
                                                        storageRef={Firebase.storage().ref('images')}
                                                        onUploadError={error => console.log(error)}
                                                        onUploadSuccess={this.handleUploadSuccessFv}
                                                    />
                                                </label>
                                            </div>

                                            <div className="form-group">
                                                <img src={this.state.image_url_bvehicle} width="200px" alt=""/>
                                                <br/><br/>
                                                <label className="btn btn-warning">
                                                Agregar foto trasera
                                                    <FileUploader
                                                        hidden
                                                        accept="image/*"
                                                        randomizeFilename
                                                        storageRef={Firebase.storage().ref('images')}
                                                        onUploadError={error => console.log(error)}
                                                        onUploadSuccess={this.handleUploadSuccessBv}
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <img src={this.state.image_url_lvehicle} width="200px" alt=""/>
                                                <br/><br/>
                                                <label className="btn btn-warning">
                                                Agregar foto lateral izquierda
                                                    <FileUploader
                                                        hidden
                                                        accept="image/*"
                                                        randomizeFilename
                                                        storageRef={Firebase.storage().ref('images')}
                                                        onUploadError={error => console.log(error)}
                                                        onUploadSuccess={this.handleUploadSuccessLv}
                                                    />
                                                </label>
                                            </div>
                                            <div className="form-group">
                                                <img src={this.state.image_url_rvehicle} width="200px" alt=""/>
                                                <br/><br/>
                                                <label className="btn btn-warning">
                                                Agregar foto lateral derecha
                                                    <FileUploader
                                                        hidden
                                                        accept="image/*"
                                                        randomizeFilename
                                                        storageRef={Firebase.storage().ref('images')}
                                                        onUploadError={error => console.log(error)}
                                                        onUploadSuccess={this.handleUploadSuccessRv}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>

                                <div className="col-sm-12 bg-dark text-white">
                                    <h5>Datos del conductor</h5>
                                </div>

                                <div className="col-sm-12 col-md-6 text-left">
                                    <br/>
                                    <div className="form-group">
                                        <label className="" htmlFor="conductorName">Nombre:</label>
                                        <input type="text" className="form-control" name="conductorName" id="conductorName" value={this.state.conductorName} onChange={this.onInputCheck} size="30"/>
                                    </div>

                                    <div className="form-group">
                                        <label className="" htmlFor="conductorLastname">Apellidos:</label>
                                        <input type="text" className="form-control" name="conductorLastname" id="conductorLastname" value={this.state.conductorLastname} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    
                                    <div className="form-group">      
                                        <label className="left" htmlFor="conductorAddress">Domicilio:</label>    
                                        <input type="text" className="form-control" name="conductorAddress" id="conductorAddress" value={this.state.conductorAddress} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    
                                    <div className="form-group">      
                                        <label className="" htmlFor="conductorDistrict">Colonia: </label>    
                                        <input type="text" className="form-control" name="conductorDistrict" id="conductorDistrict" value={this.state.conductorDistrict} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    
                                    <div className="form-group">      
                                        <label className="" htmlFor="conductorNumExt">Num. Ext:</label>    
                                        <input type="text" className="form-control" name="conductorNumExt" id="conductorNumExt" value={this.state.conductorNumExt} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    
                                    <div className="form-group">      
                                        <label className=" col-md-4" htmlFor="conductorNumInt">Num. Int:</label>    
                                        <input type="text" className="form-control" name="conductorNumInt" id="conductorNumInt" value={this.state.conductorNumInt} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    <div className="form-group">      
                                        <label className=" col-md-5" htmlFor="conductorTel">Telefono de contacto:</label>    
                                        <input type="text" className="form-control" name="conductorTel" id="conductorTel" value={this.state.conductorTel} onChange={this.onInputCheck} size="30"/>
                                    </div>
                                    <br/>
                                    
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-lg btn-block login-button">Guardar</button>
                                    </div>
                                
                                </div>
                                <div className="col-sm-12 col-md-6">
                                <br/><br/>
                                    <div className="form-group">
                                        <img src={this.state.image_url_conductor} alt="" width="200px"/>
                                        <br/><br/>
                                        <label className="btn btn-warning">
                                        Agregar foto del conductor
                                            <FileUploader
                                                hidden
                                                accept="image/*"
                                                randomizeFilename
                                                storageRef={Firebase.storage().ref('images')}
                                                onUploadError={error => console.log(error)}
                                                onUploadSuccess={this.handleUploadSuccess}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateDeviceForm;