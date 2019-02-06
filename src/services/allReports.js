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
                allReports{
                    _id,
                    reporter,
                    description,
                    name,
                    lastname,
                    img_url
                }
            }`
        },headers:{'Authorization':'JWT '+getToken()}
    })
}