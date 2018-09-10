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
                        name,
                        lastLocation
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}