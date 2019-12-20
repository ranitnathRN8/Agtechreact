import React from 'react';
import {Redirect} from 'react-router-dom';
import styles from './SignInContainer.module.css';
import axios from 'axios';

let userId;
class SignInContainer extends React.Component{
state={goBack:false,isUser:true,email:'',password:'',firstname:'',secondname:''};

setJWT=(userId,t)=>{
    // axios request to get the token and most probably userId 
    this.setState({goBack:true});
    console.log('userId token',userId,t);
    localStorage.setItem('cool',t);
    localStorage.setItem('userId',userId);
}
handleLogin=(e)=>{
    e.preventDefault();
     const user={
        email:this.state.email,
        password:this.state.password
    }
    let token=undefined;
    //let token and userId post request to api
    axios.post('http://agtech.xydev.io/api/farmer/login',user).then((res)=>{
        console.log(res);
        token=res.data.token;
        let userId=res.data.data.id;
        this.setJWT(userId,token);
     }).catch((e)=>{
         console.log('error',e);
     })   
   
}

handleSignup=(e)=>{
    console.log("inside signup");
    e.preventDefault();
    const user={
        firstname:this.state.firstname,
        lastname:this.state.secondname,
        email:this.state.email,
        password:this.state.password
    }
    console.log(user);
     //let token and userId post request to api
     let token=undefined;
     let userId=undefined;
     axios.post('http://agtech.xydev.io/api/farmer/register',{firstName:user.firstname,lastName:user.lastname,password:user.password,email:user.email}).then((res)=>{
       console.log(res);   
     token=res.data.token;
        userId=res.data.farmer._id;
        this.setJWT(userId,token);
     }).catch((e)=>{
         console.log('error',e)
     });
}

showSignup=()=>{
    console.log("heyyyyy");
    this.setState({isUser:false})
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

render(){
   let LoginForm=(
   <form  onSubmit={this.handleLogin} className={styles.loginForm}>
    <input value={this.state.email} required className={styles.loginForminput}  onChange={this.handleEmailChange} placeholder='Enter Your E-mail' type='email' />
    <input value={this.state.password} required className={styles.loginForminput} placeholder='Enter Your Password' onChange={this.handlePasswordChange} type="password"/>
    <button  type='submit'  className={styles.loginFormButton}>Login</button>
    <button type='button' onClick={this.showSignup} className={styles.loginFormButton}>Not a User?..Sign Up Now!!</button>
</form>)

let SignUpForm=(<form onSubmit={this.handleSignup} className={styles.loginForm}>
    <input required value={this.state.firstname}  onChange={this.handleFirstNameChange} className={styles.loginForminput} placeholder='Enter Your First-Name'   type="text"/>
    <input required value={this.state.secondname} onChange={this.handleSecondNameChange} className={styles.loginForminput} placeholder='Enter Your Second-Name'   type="text"/>
    <input required value={this.state.email}  onChange={this.handleEmailChange} className={styles.loginForminput} placeholder='Enter Your E-mail' type='email' />
    <input required value={this.state.password} onChange={this.handlePasswordChange} className={styles.loginForminput} placeholder='Enter Your Password'  type="password"   />
    <button type='submit' className={styles.loginFormButton}>Sign Up</button>
</form>)



    return(<>
    <div className={styles.loginContainer}>
       <div className={styles.loginFormContainer}>
    <div className={styles.formHeading}>{this.state.isUser?'Log In':'Sign Up'}</div>
         {this.state.isUser?<>{LoginForm}</>:<>{SignUpForm}</>}
       </div>

    </div>
    {this.state.goBack?<Redirect to='/'/>:undefined}
    
    
    {/* <form >      
           <button className='btn btn-primary btn-lg'>Login</button>
    </form>
  */}
    </>
    )
}

}


export default SignInContainer;