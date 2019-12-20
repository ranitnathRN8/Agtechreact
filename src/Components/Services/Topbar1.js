import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import styles from '../Services/ServicesContainer.module.css';
class Topbar1 extends React.Component{
    // state={isLoggedIn:false}
      
    // componentDidMount(){
    //     if(localStorage.getItem('expertToken')){
    //         this.setState({isLoggedIn:true});
    //     }
    // }

    // handleSignOut=()=>{
    //     localStorage.removeItem('expertToken');
    //     localStorage.removeItem('expertId');
    //     this.setState({isLoggedIn:false});
    // }

render(){

{

    return(
        <div className={styles.serviceContainer}>
        <div className={styles.logoHolder}>
        <svg xmlns="http://www.w3.org/2000/svg" height="150px" width="150px" viewBox="0 0 345.37 322.01">
            <title>Asset 1</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="l-text">
                  <text transform="translate(87.83 144.69)" fontSize="72" fill="#005f05" fontFamily="ROGFonts-Regular, ROG Fonts">AG.</text>
                </g>
                <text id="s-text" transform="translate(106.73 184.96)" fontSize="48" fill="#00b460" fontFamily="SegoeScript, Segoe Script">tech</text>
                <polygon id="right-t" points="30 134.97 149.97 254.94 134.97 269.94 0 134.97 134.97 0 149.97 15 30 134.97" fill="#22224f"/>
                <polygon id="left-t" points="316.94 134.97 181.97 269.94 166.97 254.94 286.94 134.97 166.97 15 181.97 0 316.94 134.97" fill="#22224f"/>
              </g>
            </g>
          </svg>            
   </div>
   {/* <div className={styles.navbar}> */}
       {/* {this.state.isLoggedIn?<Link style={{marginLeft:'100px',position:'relative',zIndex:'100'}} onClick={this.handleSignOut}>SIGN OUT</Link>:undefined} */}
   <div className={styles.navhome}>
     <Link to="/">HOME</Link></div>
   <div className={styles.angledDiv}>
   </div>
    <div className={styles.heading}>{this.props.title}</div>
   </div>
    )
}}}
export default Topbar1;