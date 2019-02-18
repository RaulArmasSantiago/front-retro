import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';
export default (concesion) => {
    // console.log(concesion)
    return axios({
        url:constantes.urlmov+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    conceDevice(concesion:"${concesion}"){
                        _id,
                        sigfox,
                        concesion,
                        name,
                        concesionarioFullName,
                        concesionarioLastname,
                        concesionarioAddress,
                        concesionarioDistrict,
                        concesionarioNumExt,
                        concesionarioCp,
                        concesionarioTel,
                        marcaVehicle,
                        modeloVehicle,
                        placaVehicle,
                        yearVehicle,
                        conductorFullName,
                        conductorLastname,
                        conductorAddress,
                        conductorDistrict,
                        conductorNumExt,
                        conductorNumInt,
                        conductorCp,
                        conductorTel,
                        marca_taximetro,
                        modelo_taximetro,
                        numSerie_taximetro,
                        velocidadMaxima,
                        initTravel,
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
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}