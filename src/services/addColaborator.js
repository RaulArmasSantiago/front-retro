import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';


export default (data) => {
    console.log(data)
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                updateCollaborator(id:"${data._id}", data:{
                    collaborators:"${data.idcolaborador}"
                }){
                    _id,
                    collaborators{
                        _id,
                        name
                    }
                }
            }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
    //return axios.post(constantes.url+"addDevice/",data)
}