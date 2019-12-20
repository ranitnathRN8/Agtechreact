import React from 'react';
import styles from './ServicesContainer.module.css';
import {Link} from 'react-router-dom';
import Topbar from '../Services/Topbar';
import ServiceBox from '../Services/ServiceBox';
class ServicesContainer extends React.Component{
    render(){
       return( <>
        <Topbar title="OUR SERVICES"></Topbar>
        <div className={styles.serviceList}>
       <Link to="/services/equipments"><ServiceBox title='Equipments'/></Link>
       <Link to='services/description'><ServiceBox title='Distribution'/></Link>
        <ServiceBox title='MVP Product'/>
         <Link to='services/experts'><ServiceBox title=' Contact Experts'/></Link> 
        <Link to="services/blogs"><ServiceBox title='Blog'/></Link>
        <Link to='services/community'><ServiceBox title='Community'/></Link>

             
        </div>
    </>)
    }
}
// const ServiceBox=(props)=>{
//     return(
//     <div className={styles.serviceItem}>{props.title}</div>
//     )
// }


export default ServicesContainer;