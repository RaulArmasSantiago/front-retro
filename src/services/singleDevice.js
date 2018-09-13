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
                        name,
                        marcaVehicle,
                        modeloVehicle,
                        placaVehicle,
                        conductorName,
                        conductorAddress,
                        conductorDistrict,
                        conductorNumExt,
                        conductorNumExt,
                        conductorNumInt,
                        conductorTel,
                        lastLocation,
                        contTravel,
                        contTime,
                        contKm,
                        contEfectivo
                        user{
                            name,lastname,telefono
                        }
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}

