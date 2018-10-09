import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (id) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    singleDevice(id:"${id}"){
                        _id,
                        concesion,
                        name,
                        marcaVehicle,
                        modeloVehicle,
                        anioVehicle,
                        placaVehicle,
                        conductorName,
                        conductorLastname,
                        conductorAddress,
                        conductorDistrict,
                        conductorNumExt,
                        conductorNumInt,
                        conductorTel,
                        lastLocation,
                        contTravel,
                        contTime,
                        contKm,
                        contEfectivo,
                        image_url_conductor,
                        image_url_fvehicle,
                        image_url_bvehicle,
                        image_url_lvehicle,
                        image_url_rvehicle,
                        user,
                        
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}

