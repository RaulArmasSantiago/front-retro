import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';

export default (id,device) => {
    let update = `{
        devices:"${device}"
    }`;
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                mutation{
                    updateDevCollaborator(id:"${id}", data:${update}){
                        _id
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
    //return axios.post(constantes.url+"updateMe/",data)
}