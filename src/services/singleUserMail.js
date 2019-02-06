import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (mail) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    singleUserMail(email:"${mail}"){
<<<<<<< HEAD
                        _id
=======
                        _id,
                        name,
                        lastname,
                        email,
                        image_url

>>>>>>> 5baa30eb67f67882c48ecc99bf71dc87446526f4
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}