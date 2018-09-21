import React, { Component } from 'react';
import './style.css';
import updateMe from '../../services/updateMe';
import singleUser from '../../services/singleUser';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';


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
                tel:this.state.user.tel,
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
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 bg-dark container">
                    <form onSubmit={this.onFormSubmit}>
                        <h3 className="text-white">Editar perfil</h3>
                        <div className="form-group">
                            <img className="bg-white" src={this.state.image_url} width="150px" alt=""/><br/><br/>
                            <label className="btn btn-primary">
                            Subir foto
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
                        <div className="form-group">
                            <label className="text-white" htmlFor="name">Nombre:</label>
                            <input type="text" className="form-control" name="name" id="name" value={this.state.name} onChange={this.onInputCheck} size="30" disabled/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-3 left" htmlFor="lastname">Apellidos:</label>    
                            <input type="text" className="form-control" name="lastname" id="lastname" value={this.state.lastname} onChange={this.onInputCheck} size="30" disabled/>
                        </div>
                        <h4 className="text-white">Domicilio</h4>
                        <div className="form-group">      
                            <label className="text-white col-md-3" htmlFor="street">Calle: </label>    
                            <input type="text" className="form-control" name="street" id="street" value={this.state.street} onChange={this.onInputCheck} size="30"/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-3" htmlFor="numExt">Num. Ext:</label>    
                            <input type="text" className="form-control" name="numExt" id="numExt" value={this.state.numExt} onChange={this.onInputCheck} size="30"/>
                        </div>
                        
                        <div className="form-group">      
                            <label className="text-white col-md-3" htmlFor="numInt">Num. Int:</label>    
                            <input type="text" className="form-control" name="numInt" id="numInt" value={this.state.numInt} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">      
                            <label className="text-white col-md-5" htmlFor="district">Colonia:</label>    
                            <input type="text" className="form-control" name="district" id="district" value={this.state.district} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">      
                            <label className="text-white col-md-5" htmlFor="cc">Codigo Postal:</label>    
                            <input type="text" className="form-control" name="cc" id="cc" value={this.state.cc} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">      
                            <label className="text-white col-md-5" htmlFor="city">Ciudad:</label>    
                            <input type="text" className="form-control" name="city" id="city" value={this.state.city} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">      
                            <label className="text-white col-md-5" htmlFor="country">Estado:</label>    
                            <input type="text" className="form-control" name="country" id="country" value={this.state.country} onChange={this.onInputCheck} size="30"/>
                        </div>
                        <div className="form-group">      
                            <label className="text-white col-md-5" htmlFor="tel">Telefono:</label>    
                            <input type="text" className="form-control" name="tel" id="tel" value={this.state.tel} onChange={this.onInputCheck} size="30"/>
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

export default FormMe;