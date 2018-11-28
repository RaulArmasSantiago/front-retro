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
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}