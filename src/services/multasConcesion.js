import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (data) => {
    return axios({
        url:constantes.urlmov+'graphql',
        method:'post',
        data:{
            query:`
            query {
                conceReport(concesion_report:"${data}"){
                  _id
                  user_report
                  title_report
                  concesion_report
                  descripcion_report
                  fecha_report
                  cita_report
                  fin_report
                  foto_incidente
                  folio_tarjeton
                  num_licencia
                  vencimiento_licencia
                  vencimiento_poliza
                  tipo_licencia
                  nombre_queja
                  tel_queja
                  tipo_reporte
                  monto_multa
                  pagado
                  folio
                }
              }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}