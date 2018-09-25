import React, {Component} from 'react';
import "./style.css";
import addDevice from '../../services/addDevice';
import singleUserMail from '../../services/singleUserMail';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';

class FormDevice extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            sigfox:"",
            name:"",
            concesion:"",
            marcaVehicle:"",
            modeloVehicle:"",
            placaVehicle:"",
            image_url_fvehicle:"https://firebasestorage.googleapis.com/v0/b/retro-c901c.appspot.com/o/images%2F36896668_1750269811746792_3119577760905822208_n.png?alt=media&token=12ba2653-6705-40b1-8d39-64d43403bc4b",
            image_url_lvehicle:"https://firebasestorage.googleapis.com/v0/b/retro-c901c.appspot.com/o/images%2F36896668_1750269811746792_3119577760905822208_n.png?alt=media&token=12ba2653-6705-40b1-8d39-64d43403bc4b",
            image_url_rvehicle:"https://firebasestorage.googleapis.com/v0/b/retro-c901c.appspot.com/o/images%2F36896668_1750269811746792_3119577760905822208_n.png?alt=media&token=12ba2653-6705-40b1-8d39-64d43403bc4b",
            image_url_bvehicle:"https://firebasestorage.googleapis.com/v0/b/retro-c901c.appspot.com/o/images%2F36896668_1750269811746792_3119577760905822208_n.png?alt=media&token=12ba2653-6705-40b1-8d39-64d43403bc4b",
            image_url_conductor:"https://firebasestorage.googleapis.com/v0/b/retro-c901c.appspot.com/o/images%2F36896668_1750269811746792_3119577760905822208_n.png?alt=media&token=12ba2653-6705-40b1-8d39-64d43403bc4b",
            conductorFullName:"",
            conductorAddress:"",
            conductorNumExt:"",
            conductorNumInt:"",
            conductorDistrict:"",
            conductorTell:"",
            user:"",
        }
    }

    componentWillMount(){
        console.log(this.state);
    }

    toggle = (e) => {
        this.setState({
            is_admin: !this.state.is_admin
        })
        console.log(this.state)
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log(this.state)

        this.setState(
            {[name]:value}
        )
        console.log(this.state)
    }

    validatePasswords(password,verify_password){
        if(password === verify_password){
            return true
        }else{
            alert("Tu password no coincide")
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.state._id !== "" && this.state.name !== ""){
            addDevice(this.state).then((response) => {
                console.log(response.data)
                this.props.history.push('/devices')
            }).catch((err) => {
                console.log(err)
                alert(`Hubo un problema al agregar el dispositivo ${this.state.name}`)
            })
        }
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
            <h1>Registro de taxis</h1>
            <form onSubmit={this.onFormSubmit}>

                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-4 form-group">
                        <label htmlFor="sigfox" className="sr-only">Id Sigfox:</label>
                        <input className="form-control" type="text" name="sigfox" id="sigfox" value={this.state.sigfox} onChange={this.onInputCheck} placeholder="Id. Sigfox"/>
                    </div>
                    <div className="col-sm-12 col-md-4 form-group">
                        <label htmlFor="name" className="sr-only">Nombre:</label>
                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.onInputCheck} placeholder="Nombre del taximetro (Taller_Salt_00, Tax_00, etc.)"/>
                    </div>
                    <div className="col-sm-12 col-md-4 form-group">
                        <label htmlFor="concesion" className="sr-only">Concesión:</label>
                        <input className="form-control" type="text" name="concesion" id="concesion" value={this.state.concesion} onChange={this.onInputCheck} placeholder="Concesión"/>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-dark">
                                <h6 className="text-white text-left">Datos del conductor</h6>
                            </div>
                            <div className=" row card-body">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="conductorFullName" className="sr-only">Nombre:</label>
                                        <input className="form-control" type="text" name="conductorFullName" id="consutorFullName" value={this.state.conductorFullName} onChange={this.onInputCheck} placeholder="Nombre completo"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="conductorAddress" className="sr-only">Dirección:</label>
                                        <input className="form-control" type="text" name="conductorAddress" id="conductorAddress" value={this.state.conductorAddress} onChange={this.onInputCheck} placeholder="Calle"/>
                                    </div>
                                    <div className="form-group form-inline">
                                        <label htmlFor="conductorNumExt" className="sr-only">Numero Exterior:</label>
                                        <input className="form-control" type="text" name="conductorNumExt" id="conductorNumExt" value={this.state.conductorNumExt} onChange={this.onInputCheck} placeholder="Numero Ext." size="24"/>
                                        <label htmlFor="conductorNumInt" className="sr-only">Numero Interior:</label>
                                        <input className="form-control ml-2" type="text" name="conductorNumInt" id="conductorNumInt" value={this.state.conductorNumInt} onChange={this.onInputCheck} placeholder="Numero Int." size="24"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="conductorDistrict" className="sr-only">Colonia:</label>
                                        <input className="form-control" type="text" name="conductorDistrict" id="conductorDistrict" value={this.state.conductorDistrict} onChange={this.onInputCheck} placeholder="Colonia"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="conductorTel" className="sr-only">Telefono:</label>
                                        <input className="form-control" type="text" name="conductorTel" id="conductorTel" value={this.state.conductorTel} onChange={this.onInputCheck} placeholder="Telefono de contacto"/>
                                    </div>
                                </div>
<br/>
                                <div className="col-md-6">
                                    <img src={this.state.image_url_conductor} alt="Foto conductor" width="200px"/>
                                    <br/><br/>
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-dark">
                                <h6 className="text-white text-left">Datos del vehiculo</h6>
                            </div>
                            <div className=" row card-body">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label htmlFor="marcaVehicle" className="sr-only">Marca:</label>
                                        <input className="form-control" type="text" name="marcaVehicle" id="marcaVehicle" value={this.state.marcaVehicle} onChange={this.onInputCheck} placeholder="Marca"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="modeloVehicle" className="sr-only">Modelo:</label>
                                        <input className="form-control" type="text" name="modeloVehicle" id="modeloVehicle" value={this.state.modeloVehicle} onChange={this.onInputCheck} placeholder="Modelo"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="placaVehicle" className="sr-only">Placas:</label>
                                        <input className="form-control" type="text" name="placaVehicle" id="placaVehicle" value={this.state.placaVehicle} onChange={this.onInputCheck} placeholder="Placas" size="24"/>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <img src={this.state.image_url_fvehicle} alt="Foto conductor" width="200px"/><br/><br/>
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
                                    <img src={this.state.image_url_bvehicle} alt="Foto conductor" width="200px"/><br/><br/>
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
                                </div>

                                <div className="col-md-4">
                                    <img src={this.state.image_url_rvehicle} alt="Foto conductor" width="200px"/><br/><br/>
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
                                    <img src={this.state.image_url_lvehicle} alt="Foto conductor" width="200px"/><br/><br/>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header bg-dark">
                                <h6 className="text-white text-left">Concesionario</h6>
                            </div>
                            <div className=" row card-body">
                                <div className="form-group col-md-5">
                                    <label className="sr-only" htmlFor="user">Id concesionario</label>
                                    <input className="form-control" type="text" name="user" id="user" value={this.state.user} onChange={this.onInputCheck} placeholder="Id del concesionario."/>
                                </div>

                                <div className="col-md-7">
                                    <strong>Nota:</strong> Si el usuario desconoce su id, puede encontrarlo en su perfil de usuario.

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="form-group ">
					<button type="submit" className="btn btn-primary btn-lg btn-block">Registrar taxi</button>
				</div>

            </form>
            </div>
        )
    }
}

export default FormDevice;