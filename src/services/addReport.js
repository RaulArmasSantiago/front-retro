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
/* 
query: "↵            
mutation{               
    addReport(data:{
        name:"JULIO CESAR",
        lastname:"GARCIA MATA",
        img_url:"http://www.hussein-ig.com/gui/images/avatar.png",
        description:"nkj",
        reporter:"6537",
        user_reporter:"5c4761901a4f010f74a555ef"
    }){
        _id,
        name}              
    }"
 */