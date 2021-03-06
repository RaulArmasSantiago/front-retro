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
                me{
                    _id,
                    name,
                    lastname,
                    email,
                    street,
                    district,
                    numExt,
                    numInt,
                    city,
                    country,
                    cc,
                    telefono,
                    image_url,
                    devices{
                        _id,
                        concesion,
                        name,
                        conductorName,
                        conductorLastname,
                        sigfox,
                        marcaVehicle,
                        modeloVehicle,
                        anioVehicle,
                        placaVehicle,
                        image_url_lvehicle,
                        lastLocation
                        image_url_conductor
                    },
                    collaborators{
                        _id,
                        name,
                        lastname,
                        email,
                        telefono,
                        image_url,
                        street,
                        district,
                        numExt,
                        numInt,
                        city,
                        country,
                        cc,
                        devices{
                            _id
                        },
                        reporters{
                            _id,
                            reporter
                        }
                    }
                }
            }
        `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}