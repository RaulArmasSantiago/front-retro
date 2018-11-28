import React, {Component} from 'react';
import "./style.css";
import updateDevice from '../../services/updateDevice';
import singleDevice from '../../services/singleDevice';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';

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
            conductorNumExt:"",
            conductorNumInt:"",
            conductorTel:"",
            concesion:"",
            user:""
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
                conductorNumExt:this.state.device.conductorNumExt,
                conductorNumInt:this.state.device.conductorNumInt,
                conductorTel:this.state.device.conductorTel,
                concesion:this.state.device.concesion,
                image_url_bvehicle:this.state.device.image_url_bvehicle,
                image_url_conductor:this.state.device.image_url_conductor,
                image_url_fvehicle:this.state.device.image_url_fvehicle,
                image_url_lvehicle:this.state.device.image_url_lvehicle,
                image_url_rvehicle:this.state.device.image_url_rvehicle
            })
            //console.log(this.state)
            
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
             this.props.history.push(`/device/${this.state._id}`)
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
            <div className="container">
                <h1>Dispositivos {this.state._id}</h1>
                <div className="row">
                    <div className="col-sm-12 col-md-5 bg-dark container">
                    <form onSubmit={this.onFormSubmit}>
                        <h3 className="text-white">Datos del conductor</h3>
                        <div className="form-group">
                            <label className="text-white" htmlFor="conductorName">Nombre:</label>
                            <input type="text" className="form-control" name="conductorName" id="conductorName" value={this.state.conductorName} onChange={this.onInputCheck} size="30"/>
                        </div>

                        <div className="form-group">
                            <label className="text-white" htmlFor="conductorLastname">Apellidos:</label>
                            <input type="text" className="form-control" name="conductorLastname" id="conductorLastname" value={this.state.conductorLastname} onChange={this.onInputCheck} size="30"/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-4 left" htmlFor="conductorAddress">Domicilio:</label>    
                            <input type="text" className="form-control" name="conductorAddress" id="conductorAddress" value={this.state.conductorAddress} onChange={this.onInputCheck} size="30
                            "/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-4" htmlFor="conductorDistrict">Colonia: </label>    
                            <input type="text" className="form-control" name="conductorDistrict" id="conductorDistrict" value={this.state.conductorDistrict} onChange={this.onInputCheck} size="30"/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-4" htmlFor="conductorNumExt">Num. Ext:</label>    
                            <input type="text" className="form-control" name="conductorNumExt" id="conductorNumExt" value={this.state.conductorNumExt} onChange={this.onInputCheck} size="30"/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-4" htmlFor="conductorNumInt">Num. Int:</label>    
                            <input type="text" className="form-control" name="conductorNumInt" id="conductorNumInt" value={this.state.conductorNumInt} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">      
                            <label className="text-white col-md-5" htmlFor="conductorTel">Telefono de contacto:</label>    
                            <input type="text" className="form-control" name="conductorTel" id="conductorTel" value={this.state.conductorTel} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">
                            <label className="btn btn-primary">
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
                        <hr/>
                        <h3 className="text-white">Datos de la concesion</h3>
                        <div className="form-group">
                            <label htmlFor="concesion" className="text-white col-md-3">Concesion</label>
                            <input type="text" className="form-control" name="concesion" id="concesion" value={this.state.concesion} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="marcaVehicle" className="text-white col-md-3">Marca</label>
                            <input type="text" className="form-control" name="marcaVehicle" id="marcaVehicle" value={this.state.marcaVehicle} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modeloVehicle" className="text-white col-md-3">Modelo</label>
                            <input type="text" className="form-control" name="modeloVehicle" id="modeloVehicle" value={this.state.modeloVehicle} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="anioVehicle" className="text-white col-md-3">Modelo</label>
                            <input type="text" className="form-control" name="anioVehicle" id="anioVehicle" value={this.state.anioVehicle} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="placaVehicle" className="text-white col-md-3">Placas</label>
                            <input type="text" className="form-control" name="placaVehicle" id="placaVehicle" value={this.state.placaVehicle} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">
                            <label className="btn btn-primary">
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
                            <label className="btn btn-primary">
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
                            <label className="btn btn-primary">
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
                        <div className="form-group">
                            <label className="btn btn-primary">
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
                        <br/>
                        <div className="form-group">
							<button type="submit" className="btn btn-primary btn-lg btn-block login-button">Guardar</button>
						</div>
                    </form>
                    <br/>
                    </div>
                    <br/>
                    <div className="col-sm-12 col-md-6">
                        <img src="/img/retro3.jpg" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateDeviceForm;