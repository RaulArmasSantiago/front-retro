import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';

export default (data) => {
    let updateMe = `{
        image_url:"${data.image_url}",
        street:"${data.street}",
        district:"${data.district}",
        numExt:"${data.numExt}",
        numInt:"${data.numInt}",
        city:"${data.city}",
        country:"${data.country}",
        cc:"${data.cc}",
        telefono:"${data.tel}"
    }`;
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                mutation{
                    updateUser(id:"${data._id}", data:${updateMe}){
                        _id
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
    //return axios.post(constantes.url+"updateMe/",data)
}