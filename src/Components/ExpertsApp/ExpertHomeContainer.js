import React from 'react';
import {Link} from 'react-router-dom';
import Topbar from '../../Components/Services/Topbar';
import './ExpertHomeContainer.css';
import axios from 'axios';

class ExpertHome extends React.Component{
    state={isLoggedIn:false,appointments:[]}
    
componentDidMount(){
    // appointments axios request to get all the appointments
//    let appointments=[{expert:'',farmer:{_id:'',name:'',},price:'',location:'',description:'',date:'',confirmStatus:''}]

if(localStorage.getItem('expertToken')){
   let token=localStorage.getItem('expertToken');
    axios.get('http://agtech.xydev.io/api/appointment/expert/me', { headers: {"Authorization" : `Bearer ${token}`} }).then((res)=>{
        console.log('result',res);
        let appointments=res.data.appointments;
        this.setState({appointments:appointments});
    }).catch((e)=>{
        console.log('error',e);
    });
    this.setState({isLoggedIn:true,currentExpertId:localStorage.getItem('expertId')});
}
console.log(localStorage.getItem('expertToken'));

    // let appointments=[{_id:'1',expert:'',farmer:{_id:'1',name:'ramu',},price:2900,location:'lankeswar',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti tenetur explicabo ratione quos inventore iure eum. Molestiae labore, nihil neque ipsam explicabo accusamus laboriosam dolore cum earum architecto alias reiciendis.',date:'18/12/19',confirmStatus:false},{_id:'2',expert:'',farmer:{_id:'1',name:'ramu',},price:2900,location:'lankeswar',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti tenetur explicabo ratione quos inventore iure eum. Molestiae labore, nihil neque ipsam explicabo accusamus laboriosam dolore cum earum architecto alias reiciendis.',date:'18/12/19',confirmStatus:false},{_id:'3',expert:'',farmer:{_id:'1',name:'ramu',},price:2900,location:'lankeswar',description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti tenetur explicabo ratione quos inventore iure eum. Molestiae labore, nihil neque ipsam explicabo accusamus laboriosam dolore cum earum architecto alias reiciendis.',date:'18/12/19',confirmStatus:false}]

  
    console.log(this.state.isLoggedIn);
   
}
acceptHandler=(appointment)=>{
// axios request
let token=localStorage.getItem('expertToken');
let data=null;
console.log(token);
axios.post(`http://agtech.xydev.io/api/appointment/${appointment._id}/confirm=true`,data,{ headers: {"Authorization" : `Bearer ${token}`} }).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log('error',e);
})
let appointments=[...this.state.appointments];
appointments=appointments.filter((a)=>{
return(appointment._id!==a._id)
})
this.setState({appointments:appointments});
}

declineHandler=(appointment)=>{
// axios
let data=null;
let token=localStorage.getItem('expertToken');
axios.post(`http://agtech.xydev.io/api/appointment/${appointment._id}/confirm=false`,data,{ headers: {"Authorization" : `Bearer ${token}`} }).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log('error',e);
})


let appointments=[...this.state.appointments];
appointments=appointments.filter((a)=>{
return(appointment._id!==a._id)
})
this.setState({appointments:appointments});
}

    render(){
        return(
            <>
        <Topbar title='My Appointments'/>
       {this.state.isLoggedIn?<><div className = "ExpertAppContainer">
       <AppointListView acceptHandler={this.acceptHandler} declineHandler={this.declineHandler} appointments={this.state.appointments}/></div></>:<Link to='/experts/login'><button className='btn btn-lg btn-primary'>Login to continue...</button></Link>}
        </>)
    }
}

class AppointListView extends React.Component{
    onaccept=(appointment)=>{
        this.props.acceptHandler(appointment);
    }
    ondecline=(appointment)=>{
        this.props.declineHandler(appointment);
    }
     
    render(){
        
        let appointmentView= this.props.appointments.map((appointment)=>{
         return(   <div className='row  myClass' key={appointment._id} style={{fontSize:'25px'}}>
        <div className='col col-md-2' style={{fontWeight:'bold', fontSize: '20px'}}>{appointment.farmer.firstName} {appointment.farmer.lastName}</div>
        <div className='col col-md-4' style={{fontSize: '20px'}}>{appointment.description}</div>
        <div className='col col-md-3' style={{fontSize: '20px'}}>{appointment.location}</div>
        <div className='col col-md-1' ><button className='btn btn-success btn-md' onClick={()=>this.onaccept(appointment)}>ACCEPT</button></div>
        <div className='col col-md-1'><button className='btn btn-danger btn-md' onClick={()=>this.ondecline(appointment)}>Decline</button></div>
            </div>)
           })
        return(

         this.props.appointments.length>0?<div className='container'>
              <div className="row myClass">
                  <div className='col col-md-2 clientName' ><h3 style={{fontWeight:'bold'}}>CLIENT</h3></div>
                  <div className='col col-md-4 clientName'><h3 style={{fontWeight:'bold'}}>DETAILS</h3></div>
                  <div className='col col-md-3 clientName'><h3 style={{fontWeight:'bold'}}>LOCATION</h3></div> <br></br>
                  <hr className = "lineExpert"></hr>
              </div>
                    {appointmentView}
          </div>:<div className='container'><div className='row'><div className='col col-md-6'><h1 className = "NoAppointments">-NO APPOINTMENTS-</h1></div></div></div>
         ) 
    }

}
export default ExpertHome;