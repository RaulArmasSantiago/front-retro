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
                addComent(id:"${data.id}",data:{
                  comments:"${data.comment}"
                }){
                  _id,
                  description,
                  reporter,
                  comments
                }
              }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
    //return axios.post(constantes.url+"addDevice/",data)
}

/* query: "↵            
mutation{↵                
    addComment(id:"5c4b3712f6bce90016700d87", data:{↵
        comments:"HGJHKJ"↵
    }){↵                    _id,↵                    comments↵                }↵            }↵            " */
