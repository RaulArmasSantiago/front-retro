import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (data) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    allName(name:"${data.conductor}"){
                        name,
                        description

                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}