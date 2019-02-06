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
                    reporters{
                        _id,
                        name,
                        lastname,description
                        reporter,
                        status
                    }
                }
            }
        `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}