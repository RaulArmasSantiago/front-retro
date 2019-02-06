import axios from 'axios';
import constantes from '../const';
<<<<<<< HEAD


export default (data) => {
    return axios.post(constantes.url+"signup/",data)
=======
import getToken from '../resolvers/getToken';


export default (data) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                addUser(data:{
                    name:"${data.name}",
                    lastname:"${data.lastname}",
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
>>>>>>> 5baa30eb67f67882c48ecc99bf71dc87446526f4
}