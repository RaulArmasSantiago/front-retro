import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';


export default (data) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                addDevice(data:{
                    name:"${data.name}",
                    sigfox:"${data.sigfox}",
                    concesion:"${data.concesion}",
                    conductorName:"${data.conductorName}"
                    conductorLastname:"${data.conductorLastname}",
                    conductorTel:"${data.conductorTel}",
                    conductorAddress:"${data.conductorAddress}",
                    conductorCountry:"${data.conductorCountry}",
                    conductorNumExt:"${data.conductorNumExt}",
                    conductorNumInt:"${data.conductorNumInt}",
                    conductorCC:"${data.conductorCC}",
                    placaVehicle:"${data.placaVehicle}",
                    image_url_fvehicle:"${data.image_url_fvehicle}",
                    image_url_lvehicle:"${data.image_url_lvehicle}",
                    image_url_rvehicle:"${data.image_url_rvehicle}",
                    image_url_bvehicle:"${data.image_url_bvehicle}",
                    image_url_conductor:"${data.image_url_conductor}",
                    user:"${data.user}"
                }){
                    _id,
                    name,
                    concesion
                }
            }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
    //return axios.post(constantes.url+"addDevice/",data)
}