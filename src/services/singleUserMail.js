import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (mail) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    singleUserMail(email:"${mail}"){
                        _id
                        _id,
                        name,
                        lastname,
                        email,
                        image_url

                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}