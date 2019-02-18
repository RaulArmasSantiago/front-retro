import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';
export default (data) => {
    // console.log(data.placaVehicle)
    return axios({
        url:constantes.urlmov+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                    updateDevice(_id:"${data.idCM._id}",
                    marcaVehicle:"${data.marcaVehicle}",
                    modeloVehicle:"${data.modeloVehicle}",
                    placaVehicle:"${data.placaVehicle}",
                    yearVehicle:"${data.anioVehicle}",
                    image_url_fvehicle:"${data.image_url_fvehicle}",
                    image_url_lvehicle:"${data.image_url_lvehicle}",
                    image_url_rvehicle:"${data.image_url_rvehicle}",
                    image_url_bvehicle:"${data.image_url_bvehicle}",
                    image_url_conductor:"${data.image_url_conductor}",
                    conductorFullName:"${data.conductorName}",
                    conductorLastname:"${data.conductorLastname}",
                    conductorAddress:"${data.conductorAddress}",
                    conductorDistrict:"${data.conductorDistrict}",
                    conductorNumExt:"${data.conductorNumExt}",
                    conductorNumInt:"${data.conductorNumInt}",
                    conductorCp:"${data.conductorcc}",
                    conductorTel:"${data.conductorTel}",
                    sigfox:"${data.sigfox}",
                    name:"${data.name}",
                    concesion:"${data.concesion}",
                    concesionarioFullName:"${data.idCM.concesionarioFullName}",
                    concesionarioLastname:"${data.idCM.concesionarioLastname}",
                    concesionarioAddress:"${data.idCM.concesionarioAddress}",
                    concesionarioDistrict:"${data.idCM.concesionarioDistrict}",
                    concesionarioNumExt:"${data.idCM.concesionarioNumExt}",
                    concesionarioCp:"${data.idCM.concesionarioCp}",
                    concesionarioTel:"${data.idCM.concesionarioTel}",
                    marca_taximetro:"${data.idCM.marca_taximetro}",
                    modelo_taximetro:"${data.idCM.modelo_taximetro}",
                    numSerie_taximetro:"${data.idCM.numSerie_taximetro}"

                    ){
                        sigfox
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })/*
    return axios.post(constantes.url+"updateDevice/",data)*/
}