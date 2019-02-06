import React,{Component} from 'react';
import './style.css';

class TuplaReport extends Component{
    constructor(props){
        super(props);
        this.state ={
            reporte:props.reporte,
            key:props.index
        }
    }

    render(){
        return(
            <tr onClick={()=> this.props.redirect(this.state.reporte._id)}>
                
                <td>{this.state.reporte.reporter}-T</td>
                <td> <img src={this.state.reporte.img_url} alt="" width="50px"/><br/>
                {this.state.reporte.name} {this.state.reporte.lastname}</td>
                
            </tr>
        )
    }

}
export default TuplaReport;