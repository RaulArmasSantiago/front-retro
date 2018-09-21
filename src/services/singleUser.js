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
                    singleUser(id:"${id}"){
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
                    image_url
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}