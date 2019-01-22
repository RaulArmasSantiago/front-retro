import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';


export default (data) => {
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                addReport(data:{
                  name:"${data.name}",
                  lastname:"${data.lastname}",
                  img_url:"${data.img_url}"
                  description:"${data.description}",
                  reporter:"${data.concesion}",
                  user_reporter:"${data.me._id}"
                }){
                  _id,
                  name
                }
              }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}