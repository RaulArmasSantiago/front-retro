import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (id) => {
    console.log(id)
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
                        records{
                            _id,
                            contKm,
                            contTime,
                            contTravel,
                            contEfectivo,
                            velocidadMaxima,
                            date
                        }
                        
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}

