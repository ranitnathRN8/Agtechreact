import React from 'react';
import Topbar from '../Topbar';
import {Link} from 'react-router-dom';
// import '../../Home/HomeContainer.css';
import './ExpertContainer.module.css';
import axios from 'axios';
import dp from '../../../Assets/technical1.png'

class ExpertContainer extends React.Component{
    state={isLoggedIn:false,experts:[],location:'',showExpert:false,currentExpert:'',reqAppointment:false,userId:''};

    componentDidMount(){
        if(localStorage.getItem('cool')){
            this.setState({isLoggedIn:true,userId:localStorage.getItem('userId')});
        }
        axios.get('http://agtech.xydev.io/api/expert/').then((res)=>{
            console.log(res);
            let experts=res.data.experts;
            this.setState({experts:experts});
        }).catch((e)=>{
            console.log('error',e);
        })
        // experts=api call
    }
    onInputHandler=(e)=>{
        this.setState({location:e.target.value})
    }
    locationHandler=(e)=>{
       e.preventDefault();
    // experts=axios call to ap to 
    // let experts=[{_id:1,name:'MAIRING',location:'lankeswar',expertIn:'agriculture'},
    // {_id:2,name:'MAIRING 1',location:'lankeswar',expertIn:'agriculture'},
    // {_id:3,name:'MAIRING 2',location:'lankeswar',expertIn:'agriculture'},
    // {_id:4,name:'MAIRING 3',location:'lankeswar',expertIn:'agriculture'},
    // {_id:5,name:'MAIRING',location:'lankeswar',expertIn:'agriculture'},
    // {_id:6,name:'MAIRING',location:'lankeswar',expertIn:'agriculture'},
    // {_id:7,name:'MAIRING',location:'lankeswar',expertIn:'agriculture'}
    axios.get('http://agtech.xydev.io/api/expert/').then((res)=>{
        console.log(res);
        let experts=res.data.experts;
        this.setState({experts:experts});
    }).catch((e)=>{
        console.log('error',e);
    })

    }
    handleExpertView=(id)=>{
axios.get(`http://agtech.xydev.io/api/expert/${id}`).then((res)=>{
        console.log(res);
         let expert=res.data;
        this.setState({currentExpert:expert,showExpert:true});      
    }).catch((e)=>{
        console.log('error',e);
    })
// let expert= {_id:2,name:'MAIRING 1',location:'lankeswar',expertIn:'agriculture'};
    }

    closeHandler=()=>{
        this.setState({showExpert:false,currentExpert:''});
    }
    handlereqAppointment=(id)=>{
        axios.get(`http://agtech.xydev.io/api/expert/${id}`).then((res)=>{
        console.log(res);
         let expert=res.data;
         this.setState({reqAppointment:true,currentExpert:expert});    
    }).catch((e)=>{
        console.log('error',e);
    })   
    }
    submitAppointmentReq=(req)=>{
        let token=localStorage.getItem('cool');
        console.log("heyyyyy fucker",req.location);
        axios.post(`http://agtech.xydev.io/api/appointment/create&expert=${this.state.currentExpert._id}`,{location:req.location,price:req.price,description:req.description}, { headers: {"Authorization" : `Bearer ${token}`} }).then((res)=>{
                 this.setState({reqAppointment:false,currentExpert:'',showExpert:false,location:''});
                 console.log(res);
        }).catch((e)=>{
            console.log('error in posting',e);
        })
       
    }
    handleAppointmentClose=()=>{
        this.setState({currentExpert:'',reqAppointment:false,showExpert:false});
    }
    render(){
        return(
            <>
        <Topbar title={this.state.reqAppointment||this.state.showExpert?'Request An Appointment':'Find Experts In Your Area'}/>
        {this.state.isLoggedIn? <> {this.state.showExpert||this.state.reqAppointment?undefined:<form className='expertForm' onSubmit={this.locationHandler} style={{width:'50%',position:'relative',left:'50%',transform:'translateX(-50%)'}}>
       <input type='text/' value={this.state.location} className='expertInput' placeholder='Enter Your Location' onChange={this.onInputHandler}/>
     <button className='expertButton'>SEARCH</button>
        </form>}<div className='expertInfoBox' style={{width:'50%',
    position:'relative',
    left:'50%',
    transform:'translateX(-50%)',
    backgroundColor: '#e1d2e9c2',
    height:'fitContent'}}>
        {this.state.reqAppointment?
        <ExpertHiringForm userId={this.state.userId} expert={this.state.currentExpert} submitAppointmentReq={this.submitAppointmentReq}  handleAppointmentClose={this.handleAppointmentClose}/> :
        this.state.showExpert?<ExpertProfileView handlereqAppointment={this.handlereqAppointment} closeHandler={this.closeHandler} expert={this.state.currentExpert}/>:<ExpertView handlereqAppointment={this.handlereqAppointment} handleExpertView={this.handleExpertView} experts={this.state.experts}/>}
         </div></> :(<Link to='/login'><button className='btn btn-lg btn-primary'>Login To Continue</button></Link>)}
        </>
        )
    }
}

const ExpertView =({experts,handleExpertView,handlereqAppointment})=>{

    if(experts.length===0){
        return(<div>No Experts in your area!</div>)
    }
    else{
      return( 
          experts.map((expert)=>{
          return(
           <>
           <div className='expertInfo' style = {{height: '100px', backgroundColor: '#679696a4'}} key={expert._id}>
                <div className='imgContainer' style={{borderRadius: '50px'}}></div>
          <div className='expertName' style={{fontSize:'20px',color:'white',fontFamily:'Arial'}}>{expert.firstName} {expert.lastName}     <br></br>Expert in {expert.expertise}</div>
            </div>
            <div>
            <button onClick={()=>handleExpertView(expert._id)} style={{background:'#2f2352',padding:'10px',fontFamily:'Arial',fontWeight:'bold',color:'white', borderRadius: '10px'}}>VIEW PROFILE</button>
             <button  onClick={()=>handlereqAppointment(expert._id)} style={{marginTop:'5px', marginLeft: '20px',marginBottom:'20px',background:'green',padding:'10px',fontFamily:'Arial',fontWeight:'bold',color:'white', borderRadius: '10px'}} >REQUEST APPOINTMENT</button>
            </div>
             
             </>
               
            )})
          
        )}
    }

class ExpertProfileView extends React.Component{

render(){
let {expert}=this.props;

    return(
        <div className='profileViewer'>
            <img src={`{expert.img}`} alt={''} />
    <div style={{fontFamily:'Arial', fontSize: '40px', paddingBottom: '10px'}}>{expert.firstName} {expert.lastName} </div>
            <div style={{fontFamily:'Arial', fontSize: '20px', paddingBottom: '10px'}}>Expert in {expert.expertise}</div>
             <button  onClick={()=>this.props.handlereqAppointment(expert._id)} style={{marginTop:'3px',marginBottom:'20px',background:'green',padding:'10px',fontFamily:'Arial',fontWeight:'bold',color:'white',marginRight:'20px', borderRadius: '10px'}}>REQUEST APPOINTMENT</button>
             <button onClick={this.props.closeHandler} style={{background:'red',padding:'10px',fontFamily:'Arial',fontWeight:'bold',color:'white', borderRadius: '10px'}}>Close</button>
        </div>
    )
}

}
class ExpertHiringForm extends React.Component{
    state={location:'',description:'',price:''};
    onLocationChangeHandler=(e)=>{
         this.setState({location:e.target.value});  
    }
    onDescriptionChangeHandler=(e)=>{
        this.setState({description:e.target.value});
    }
    onPriceChangeHandler=(e)=>{
        this.setState({price:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let date=new Date();
        const request={
            date:date.toISOString(),
            location:this.state.location,
            description:this.state.description,
            price:this.state.price,
            userId:this.props.userId,
        }
        this.props.submitAppointmentReq(request);
    }

    render(){
        return(
            <>
        <form className='expertForm' onSubmit={this.handleSubmit} style={{width:'70%'}}>
        <input type='text/' style={{marginRight:'10px',width:'250px'}} value={this.state.location} className='expertInput' placeholder='Enter Your Location' onChange={this.onLocationChangeHandler}/>
        <input type='text/' style={{marginRight:'10px',width:'250px'}} value={this.state.description} className='expertInput' placeholder='Appointment description' onChange={this.onDescriptionChangeHandler}/>
        <input type='number' style={{width:'200px'}} value={this.state.price} className='expertInput' placeholder='Money You Are Offering' onChange={this.onPriceChangeHandler}/>
      <button type='submit' style={{width:'200px',padding: '0 8px 0 8px' ,background:'blue',marginLeft:'10px',color:'white'}} className=' expertButton'>Submit</button>
         </form>
          <button onClick={this.props.handleAppointmentClose} style={{width:'150px',background:'red',marginTop:'40px',color:'white'}} className='expertButton'>Close</button>
          </>)
    }
}


export default ExpertContainer;