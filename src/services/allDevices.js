import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default () => {

    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    allDevice{
                        _id,
                        sigfox,
                        concesion,
                        name,
                        marcaVehicle,
                        modeloVehicle,
                        anioVehicle,
                        placaVehicle,
                        conductorName,
                        conductorLastname,
                        lastLocation,
                        image_url_conductor                       
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}