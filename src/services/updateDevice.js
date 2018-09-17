import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (id,data) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                mutation{
                    updateDevice(id:"${id}",data{conductorFullName:"${data.conductorFullName}"}){
                        _id,
                        name,
                    }
                }
            `
        }
    })
}