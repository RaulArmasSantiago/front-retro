import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';


export default (data) => {
    
    console.log(data);
    /* let updateDevice = `{
        status:"${data.status}"
    }
    `; */
    //console.log(updateDevice, data.id);
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
            mutation{
                updateReport(id:"${data.id}", data:{
                  status:"${data.status}"
                }){
                  _id,
                  status,
                  comments
                }
              }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })/*
    return axios.post(constantes.url+"updateDevice/",data)*/
}

/* query: "↵            
mutation{↵                
    updateReport(id:"5c4cac27f64c1d00161292ce", data:{↵                  
        status:"Activo"↵                
    }){↵                  
        _id,↵                  
        status,↵ 
    }↵              
}↵            "
 */