import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';


export default (data) => {
    
    console.log(data);
    let updateDevice = `{
        conductorFullName:"${data.conductorFullName}",
        conductorAddress:"${data.conductorAddress}",
        conductorDistrict:"${data.conductorDistrict}",
        conductorNumExt:"${data.conductorNumExt}",
        conductorNumInt:"${data.conductorNumInt}",
        conductorTel:"${data.conductorTel}",
        marcaVehicle:"${data.marcaVehicle}",
        modeloVehicle:"${data.modeloVehicle}",
        placaVehicle:"${data.placaVehicle}",
        concesion:"${data.concesion}",
        image_url_conductor:"${data.image_url_conductor}",
        image_url_fvehicle:"${data.image_url_fvehicle}",
        image_url_lvehicle:"${data.image_url_lvehicle}",
        image_url_rvehicle:"${data.image_url_rvehicle}",
        image_url_bvehicle:"${data.image_url_bvehicle}"
    }
    `;
    console.log(updateDevice, data._id);
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                    updateDevice(id:"${data._id}",data:${updateDevice}){
                        _id,
                        concesion,
                        name,
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })/*
    return axios.post(constantes.url+"updateDevice/",data)*/
}