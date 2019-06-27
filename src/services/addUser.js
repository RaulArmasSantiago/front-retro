import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';


export default (data) => {
    console.log("entro al service")
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                addUser(data:{
                    name:"${data.name}",
                    lastname:".",
                    email:"${data.email}",
                    password:"${data.password}"
                }){
                    _id,
                    email
                }
            }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
    //return axios.post(constantes.url+"signup/",data)
}