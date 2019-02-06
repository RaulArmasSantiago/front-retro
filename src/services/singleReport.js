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
                singleReport(id:"${id}"){
                    _id,
                    reporter,
                    name,
                    lastname,
                    description,
                    img_url,
                    create_at,
                    comments,
                    status
                }
            }
        `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}