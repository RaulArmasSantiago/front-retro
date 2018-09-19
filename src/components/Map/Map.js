import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import './style.css'


class Map extends Component {
   constructor(props){
     super(props);
     this.state = {
       device:this.props,
       pos:"",
       lng:"",
       lat:""
     }
   } 

   componentDidMount(){
     this.setState({pos:this.state.device.data})
   }

   getLatitud(){
     
     let pos = this.state.pos;
     let latitud = String(pos).substring(0,6)
     let grados = latitud.substring(0,2)
     let min = latitud.substring(2,4)
     let seg = latitud.substring(4,6)

     //console.log(grados,min,seg)
    latitud = (((Number(grados) * 60) + parseInt(min, 10) + (Number(seg) / 60))/60);

    //console.log(latitud)
     //this.setState({lat: (((grados * 60) + parseInt(min, 10) + (seg / 60))/60)})
    return(latitud)

   }

   getLongitud(){
     
    let pos = this.state.pos;
    let longitud = String(pos).substring(6,12)
    let grados = longitud.substring(0,2)
    let min = longitud.substring(2,4)
    let seg = longitud.substring(4,6)
    if(longitud.charAt(0) === "0"){
      //console.log("entro al 0")
      grados = 1 + grados
    }
    //console.log(grados,min,seg)
    longitud = (-((Number(grados) * 60) + parseInt(min, 10) + (Number(seg) / 60))/60);

   //console.log(longitud)
   longitud = longitud.toFixed(5)

    //this.setState({lat: (((grados * 60) + parseInt(min, 10) + (seg / 60))/60)})
    return(Number(longitud))

  }

   getLocation(){
     //console.log(this.getLatitud(), this.getLongitud());
     let cordenadas = {lat: this.getLatitud(), lng: this.getLongitud()}
     return cordenadas;     
   }

   render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {this.getLocation()}
        defaultZoom = { 11 }
      >
      <Marker options={{icon: "../img/taxi-yellow.png"}} position={this.getLocation()}/>
      </GoogleMap>
   ));
   return(
     <div>
      <div className="row justify-content-center">
        <GoogleMapExample className="col-sm-12"
          containerElement={ <div style={{ height: '400px', width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />

      </div>
     <strong>Ultima localizacion(cordenadas geograficas): </strong><br/>
     {this.getLatitud()}, {this.getLongitud()}
    </div>
   );
   }
};
export default Map;