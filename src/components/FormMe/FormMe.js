import React, { Component } from 'react';
import './style.css';
import updateMe from '../../services/updateMe';
import singleUser from '../../services/singleUser';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';
import Nav from '../Nav/Nav';


class FormMe extends Component{
    constructor(props){
        super(props)
        this.state = {
            _id:props.match.params.id,
            name:"",
            lastname:"",
            image_url:"",
            email:"",
            street:"",
            district:"",
            numExt:"",
            numInt:"",
            city:"",
            country:"",
            cc:"",
            tel:"",
        }
    }

    componentDidMount(){
        console.log(this.state._id)
        singleUser(this.state._id).then((user) => {
            console.log(user.data.data.singleUser)
            this.setState({user:user.data.data.singleUser})
            this.setState({
                name:this.state.user.name,
                lastname:this.state.user.lastname,
                email:this.state.user.email,
                street:this.state.user.street,
                district:this.state.user.district,
                numExt:this.state.user.numExt,
                numInt:this.state.user.numInt,
                city:this.state.user.city,
                country:this.state.user.country,
                cc:this.state.user.cc,
                tel:this.state.user.telefono,
                image_url:this.state.user.image_url
            })
            console.log(this.state)
            
        })
    }

    onInputCheck = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log(this.state)
        this.setState(
            {[name]:value}
        )
        //console.log(this.state)
    }

    handleUploadSuccess = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url:url})
            })

    }

    onFormSubmit = (e) => {
        e.preventDefault();
        updateMe(this.state).then((response) => {
            console.log("entro chido")
            console.log(this.state)
            console.log(response.data )
            this.props.history.push(`/profile`)
        })
   }


    render(){
        return (
            <div className="bodyFormMe">
                <Nav/>
                <br/>
                <form onSubmit={this.onFormSubmit}>
                    <div className="row justify-content-center container-fluid">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    Actualiza tus datos
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="form-group">
                                                <img className="bg-white imgRedonda" src={this.state.image_url} width="150px" alt=""/><br/><br/>
                                                <label className="btn btn-yellow">
                                                Cambiar foto
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
                                        <div className="col-sm-12 col-md-6 text-left">
                                            <h3 className="text-left">{this.state.name} {this.state.lastname}</h3>
                                            <label htmlFor=""><cite>Concesionario</cite></label>
                                            <hr/>
                                            <h4>Domicilio</h4>
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="street">Calle: </label>    
                                                <input type="text" className="form-control" name="street" id="street" value={this.state.street} onChange={this.onInputCheck} size="30" placeholder="Calle"/>
                                            </div>
                                            <div className="form-group form-inline">
                                                <label className="sr-only" htmlFor="numExt">Num. Ext:</label>    
                                                <input type="text" className="form-control" name="numExt" id="numExt" value={this.state.numExt} onChange={this.onInputCheck} size="10" placeholder="Num. Exterior"/>
                                                <label className="sr-only" htmlFor="numInt">Num. Int:</label>    
                                                <input type="text" className="form-control ml-3" name="numInt" id="numInt" value={this.state.numInt} onChange={this.onInputCheck} size="10" placeholder="Num. Interior"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="district">Colonia:</label>    
                                                <input type="text" className="form-control" name="district" id="district" value={this.state.district} onChange={this.onInputCheck} size="30" placeholder="Colonia"/>
                                            </div>
                                            <div className="form-group">      
                                                <label className="sr-only" htmlFor="cc">Codigo Postal:</label>    
                                                <input type="text" className="form-control" name="cc" id="cc" value={this.state.cc} onChange={this.onInputCheck} size="30" placeholder="Codigo Postal"/>
                                            </div>
                                            <div className="form-group">      
                                                <label className="sr-only" htmlFor="city">Ciudad:</label>    
                                                <input type="text" className="form-control" name="city" id="city" value={this.state.city} onChange={this.onInputCheck} size="30" placeholder="Ciudad"/>
                                            </div>
                                            <div className="form-group">      
                                                <label className="sr-only" htmlFor="country">Estado:</label>    
                                                <input type="text" className="form-control" name="country" id="country" value={this.state.country} onChange={this.onInputCheck} size="30" placeholder="Estado"/>
                                            </div>
                                            <div className="form-group">      
                                                <label className="sr-only" htmlFor="tel">Telefono:</label>    
                                                <input type="text" className="form-control" name="tel" id="tel" value={this.state.tel} onChange={this.onInputCheck} size="30" placeholder="Telefono"/>
                                            </div> 
                                            <button type="submit" className="btn btn-yellow btn-lg btn-block login-button">Guardar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col-sm-12 col-md-10 container">
                    <form onSubmit={this.onFormSubmit}>
                    
                        <div className="form-group">
							
						</div>
                    </form>
                    <br/>
                    </div>
                </div>
            </div>
        )    
    }
}

export default FormMe;