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
                    telefono
                }
            }
        `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}