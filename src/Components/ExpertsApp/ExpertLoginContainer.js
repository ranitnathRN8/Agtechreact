import React from 'react';
import styles from '../SignIn/SignInContainer.module.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
class ExpertLoginContainer extends React.Component{

    state={goBack:false,isUser:true};
    componentDidMount(){
        console.log(this.state.goBack);
    }

    setJwt=(t,expertId)=>{
        console.log('hey');
        console.log(t);
        console.log(expertId);
        localStorage.setItem('expertToken',t);
        localStorage.setItem('expertId',expertId);
        this.setState({goBack:true});
    }
    
    handleLogin=(expert)=>{
        //let token and userId post request to api
        console.log(expert);
        let token=undefined;
        let expertId=undefined;
       axios.post('http://agtech.xydev.io/api/expert/login',expert).then((res)=>{
          console.log('eid',res);
          token=res.data.token;
          expertId=res.data.data.id;
          this.setJwt(token,expertId);
       }).catch((e)=>{
           console.log('error',e);
       })
       
    }
    
    handleSignUp=(expert)=>{
         //let token and userId post request to api
         let token=undefined;
         let expertId=undefined;
         console.log(expert.expertise);
         axios.post('http://agtech.xydev.io/api/expert/register',{password:expert.password,email:expert.email,firstName:expert.firstname,lastName:expert.lastname,expertise:expert.expertise}).then((res)=>{
            token=res.data.token;
            expertId=res.data.expert._id;
            this.setJwt(token,expertId);
         }).catch((e)=>{
             console.log('error',e)
         });
    }
    
    showSignup=()=>{
        console.log("heyyyyy");
        this.setState({email:'',password:'',isUser:false});
    }
    
    render(){    
        return(<>
        <div className={styles.loginContainer} style={{height:'120vh'}}>
           <div className={styles.loginFormContainer}>
        <div className={styles.formHeading}>{this.state.isUser?'Expert Log In!!':'Expert Sign Up!!'}</div>
             {this.state.isUser?<><LoginForm handleLogin={this.handleLogin} showSignup={this.showSignup}/></>:<><SignUpForm handleSignUp={this.handleSignUp}/></>}
           </div>
    
        </div>
        {this.state.goBack?<Redirect to='/experts'/>:undefined}
        
        
        {/* <form >      
               <button className='btn btn-primary btn-lg'>Login</button>
        </form>
      */}
        </>
        )
    }
    

}
class SignUpForm extends React.Component{
    state={email:'',password:'',firstname:'',secondname:'',expertIn:''}
    
    onSignup=(e)=>{
        e.preventDefault();
        const expert={
            firstname:this.state.firstname,
            lastname:this.state.secondname,
            email:this.state.email,
            password:this.state.password,
            expertise:this.state.expertIn,
        }
        this.props.handleSignUp(expert);
    }
    handleEmailChange=(e)=>{
        this.setState({email:e.target.value});
        }
        handlePasswordChange=(e)=>{
            this.setState({password:e.target.value});
        }
        handleFirstNameChange=(e)=>{
            this.setState({firstname:e.target.value});
        }
        handleSecondNameChange=(e)=>{
            this.setState({secondname:e.target.value});
        }
        handleexpertiseChange=(e)=>{
            this.setState({expertIn:e.target.value});
        }

    render(){
        return(
            <form onSubmit={this.onSignup} className={styles.loginForm}>
        <input required value={this.state.firstname} onChange={this.handleFirstNameChange} className={styles.loginForminput} placeholder='Enter Your First-Name'   type="text"/>
        <input required value={this.state.secondname} onChange={this.handleSecondNameChange} className={styles.loginForminput} placeholder='Enter Your Second-Name'   type="text"/>
        <input required value={this.state.email} className={styles.loginForminput}  onChange={this.handleEmailChange} placeholder='Enter Your E-mail' type='email'/>
        <input required value={this.state.expertIn} onChange={this.handleexpertiseChange} className={styles.loginForminput} placeholder='Expertise'   type="text"/>
        <input required value={this.state.password} className={styles.loginForminput}  onChange={this.handlePasswordChange} placeholder='Enter Your Password'  type="password"   />
        <button type='submit' className={styles.loginFormButton}>Sign Up</button>
    </form>
        )
    }
}

class LoginForm extends React.Component{
    state={email:'',password:''}
   onLogin=(e)=>{
       e.preventDefault();
    const expert={
        email:this.state.email,
        password:this.state.password
    }
        this.props.handleLogin(expert);
   }
   handleEmailChange=(e)=>{
    this.setState({email:e.target.value});
    }
    handlePasswordChange=(e)=>{
        this.setState({password:e.target.value});
    }
    render(){
        return(
<><form onSubmit={this.onLogin} className={styles.loginForm}>
        <input required value={this.state.email} className={styles.loginForminput}  onChange={this.handleEmailChange} placeholder='Enter Your E-mail' type='email' />
        <input handle={this.state.password} required className={styles.loginForminput} placeholder='Enter Your Password' onChange={this.handlePasswordChange} type="password"/>
        <button  type='submit' className={styles.loginFormButton}>Login</button>
        <button type='button' onClick={this.props.showSignup} className={styles.loginFormButton}>Not a User?..Sign Up Now!!</button>
    </form>
      
    </>
        )
    }
}
export default ExpertLoginContainer;