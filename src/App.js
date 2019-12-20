import React,{useContext} from 'react';
import {Route} from 'react-router-dom';

import ServicesContainer from './Components/Services/ServicesContainer';
import Equipments from './Components/Services/Equipments/Equipments';
import BlogsList from './Components/Services/Blogs/BlogsList';
import CommunityContainer from './Components/Services/Community/CommunityContainer';
import SignInContainer from './Components/SignIn/SignInContainer';
import HomeContainer from './Components/Home/HomeContainer';
import ExpertContainer from './Components/Services/Experts/ExpertContainer';
import DistributorsContainer from './Components/Services/Distributors/DistributorsContainer'
import ExpertLoginContainer from './Components/ExpertsApp/ExpertLoginContainer';
import ExpertHomeContainer from './Components/ExpertsApp/ExpertHomeContainer';
import AccountContainer from './Components/MyAccounts/AccountContainer';

import './app.css';
// import HomeContainer from './Components/Home/HomeContainer';
// import SignInContainer from './Components/SignIn/SignInContainer';

class App extends React.Component {
  state={userId:''};
  componentDidMount(){
    if(localStorage.getItem('userId')){
    this.setState({userId:String(localStorage.getItem('userId'))});
    }
  }

  render(){
  return (
    <>
    <Route exact path="/" component={HomeContainer}/>
    <Route exact path="/services" component={ServicesContainer}/>
    <Route exact path="/services/equipments" component={Equipments}/>
    <Route exact path="/services/blogs" component={BlogsList}/>
    <Route exact path='/services/community' component={CommunityContainer}/>
    <Route exact path='/community/read/:qid' component={CommunityContainer}/>
    <Route exact path='/community/edit/:editqid' component={CommunityContainer}/>
    <Route exact path='/services/experts' component={ExpertContainer}/>
    <Route exact path='/login' component={SignInContainer}/>
    <Route exact path='/experts/login' component={ExpertLoginContainer}/>
    <Route exact path='/experts' component={ExpertHomeContainer}/>
    <Route exact path='/myaccount' component={AccountContainer}/>
    <Route exact path='/services/distribution' component={DistributorsContainer}/>


   </>
  );}
}

export default App;
