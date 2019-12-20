import React from 'react';
import styles from './ServicesContainer.module.css';
const ServiceBox=(props)=>{
    return(
    <div className={styles.serviceItem}>{props.title}</div>
    )
}

export default ServiceBox;