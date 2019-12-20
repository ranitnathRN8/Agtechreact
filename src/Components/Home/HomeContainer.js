import React from 'react';
import {Link } from 'react-router-dom';
// import { Animate, animateScroll as scroll } from "react-scroll";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import './HomeContainer.css';

class HomeContainer extends React.Component{
 state={experts:[],location:'',isLoggedIn:false};
 
 componentDidMount(){
     if(localStorage.getItem('cool')){
         this.setState({isLoggedIn:true}); 
     }
    let experts=[{_id:1,name:'MAIRING',location:'lankeswar',expertIn:'agriculture'},
    {_id:2,name:'MAIRING 1',location:'lankeswar',expertIn:'agriculture'},
    {_id:3,name:'MAIRING 2',location:'lankeswar',expertIn:'agriculture'},
    {_id:4,name:'MAIRING 3',location:'lankeswar',expertIn:'agriculture'}    
];
this.setState({experts:experts});
 }
 onInputHandler=(e)=>{
this.setState({location:e.target.value});
 }
 locationHandler=(e)=>{
     e.preventDefault();
    //  let experts=api request
    let experts=[ {_id:2,name:'MAIRING 1',location:'lankeswar',expertIn:'agriculture'},
    {_id:3,name:'MAIRING 2',location:'lankeswar',expertIn:'agriculture'}];
    let expertItems=[];
    if(experts.length<=4){
    for(let i=0;i<experts.length;i++){
        expertItems.push(experts[i]);
    }}
    else{
        expertItems=experts;
    }
    this.setState({experts:expertItems});
 }
 handleSignOut=()=>{
     localStorage.removeItem('cool');
     localStorage.removeItem('userId');
     this.setState({isLoggedIn:false});
 }

    render(){
        return( <>
        <div className="page-1">
        <div className="nav-logo">
            <div className="logo-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 345.37 322.01">
                    <title>Asset 1</title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <g id="l-text">
                                <text transform="translate(87.83 144.69)" fontSize="72" fill="#a5eba4"
                                    fontFamily="ROGFonts-Regular, ROG Fonts">AG.</text>
                            </g>
                            <text id="s-text" transform="translate(106.73 184.96)" fontSize="48" fill="#4ad948"
                                fontFamily="SegoeScript, Segoe Script">tech</text>
                            <polygon id="right-t"
                                points="30 134.97 149.97 254.94 134.97 269.94 0 134.97 134.97 0 149.97 15 30 134.97"
                                fill="#a5acf0" />
                            <polygon id="left-t"
                                points="316.94 134.97 181.97 269.94 166.97 254.94 286.94 134.97 166.97 15 181.97 0 316.94 134.97"
                                fill="#a5acf0" />
                        </g>
                    </g>
                </svg></div>
            <nav className="navbar">
                <Link to="/">HOME</Link>
                <AnchorLink href='#services'>SERVICES</AnchorLink>
                {this.state.isLoggedIn?<Link to='/myaccount'>MY ACCOUNT</Link>:undefined}
       {this.state.isLoggedIn?<Link onClick={this.handleSignOut}>SIGN OUT</Link>:<Link to='/login'>SIGN IN</Link>}
            </nav>
            <div className="cross">X</div>
        </div>

        {/* <div className="hero-text">
            INTRODUCING...
        </div>
        <div className="support-hero-text">
            A new world where our farmers are powered with development in the technical world and get information at the
            click of their fingers!
        </div> */}
    </div>

    <div  className = "About">
        {/* <header>
            <nav>
                <Link to="../Index/index.html" class="logo"></Link>
                <ul class="navLinks">
                    <section class="nav1">
                            <li class="navList"><Link to = "">SERVICES</Link></li>
                            <li class="navList"><Link to = "">ABOUT</Link></li>
                            <li class="navList"><Link to = "">CONTACT</Link></li>
                    </section>
                    
                </ul>
            </nav>
        </header> */}

        <main>
            <div className= "initial">
            <div className="parta">ACHIEVE</div>
                <div className="partb">Superior Production Rates</div>
                <hr className = "line1"></hr>
                <br></br><br></br>
                <div className="mlDesc">Using AgTech’s distribution network achieve the power 
                to make the most out of your produce by being able to 
                access the best products and services at the most affordable rate.<br></br>
                Level up your production skills with technical inputs from industry certified experts and generate increased revenue.</div>
                <br></br>

                <div className="description">
                    <div className="about-image1"></div>
                    <div className="image2">
                        <div className="boxContent">
                                <div className="mlLine1">AgTech helps you</div>
                                <hr className = "line2" ></hr>
                                <div className="mlLine2">Get access to better quality seeds and better services 
                                            in your vicinity at a more affordable rate. 
                                            AgTech latches you to the most suitable dealer 
                                            for your needs while nullifying unnecessary middlemen charges.</div>
                        </div>
                    </div>
                    <div className="image3">
                    {/* Find out the best suited crop according to your location. 
                                    Make the best use of the seasonal variations 
                                    and increase revenue generation. */}
                    </div>
                </div>
            
                
            </div>
        </main>

        <section className="initial serviceSection" id = "services">
                    <div className="parta">OUR SERVICES</div>
                    <div className="partb">Increased Efficiency</div>
                    <hr className = "line3" ></hr>
                    <br></br>
                    <div className="mlDesc">Through AgTech, we believe in transforming cultivators 
                        from meagre farmers to effective businessmen with the help of 
                        efficient operations and low cost goods and products </div>
                    <br></br><br></br>

                    <div className="description0">
                        <div className="image0a">
                        </div>
                        <div className="image0b rellax" data-rellax-speed="1">
                            <div className="boxContent linkStyle"><Link to = "/services/distribution">
                                    <div className="mlLine1">Get Advanced Distribution Solutions</div>
                                    <hr className = "line0" ></hr>
                                    <div className="mlLine2">AgTech helps bridge the gap between you and the maket, storage solutions and transport solutions. 
                                    Achieve the best products and services at the most affordable rate through our network. </div>
                                            </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="description2">
                            <div className="image3a">
                                    
                            </div>
                            <div className="image3b rellax" data-rellax-speed="1">
                                <div className="boxContent linkStyle"><Link to = "/services/experts">
                                        <div className="mlLine1">Get Expert Advice</div>
                                        <hr className = "line5"></hr>
                                        <div className="mlLine2">AgTech’s experts are available 
                                            as per your requirement both online 
                                            as well as on-site to deal with the 
                                            technical aspects of production. 
                                            Adopt technical help to incur less wastages 
                                            and achieve higher production rates.</div></Link>
                                </div>
                            </div>
                            <div className="image3c">
                                    
                            </div>
                    </div>

                    <div className="description1">
                            <div className="image4a">
                                    
                            </div>
                            <div className="image4b rellax" data-rellax-speed="1">
                                <div className="boxContent linkStyle"><Link to = "/services/equipments">
                                        <div className="mlLine1">Manage Equipments Better</div>
                                        <hr className = "line6" ></hr>
                                        <div className="mlLine2">Removing all your equipment requirement headaches 
                                            are just a click away. AgTech provides the platform 
                                            to enable farmers to lend and sell agricultural equipments 
                                            and tools at favourable rates and a one stop solution 
                                            to manage all coomodity exchanges in your area.</div>
                                            </Link>
                                </div>
                            </div>
                    </div>


                    <div className="description1">
                        <div className="image2a">
                        </div>
                        <div className="image2b rellax" data-rellax-speed="1">
                            <div className="boxContent linkStyle"><Link to = "">
                                    <div className="mlLine1">Increase Average Crop Yield</div>
                                    <hr className = "line4" ></hr>
                                    <div className="mlLine2">Find out the best suited crop according to your location. 
                                    Make the best use of the seasonal variations 
                                    and increase revenue generation. </div>
                                            </Link>
                            </div>
                        </div>
                    </div>

                    

                    <div className="description5">
                            <div className="image5a">
                                    
                            </div>
                            <div className="image5b rellax" data-rellax-speed="1">
                                <div className="boxContent linkStyle"><Link to = "/services/blogs">
                                        <div className="mlLine1">Voice Your Opinion</div>
                                        <hr className = "line5"></hr>
                                        <div className="mlLine2">AgTech's open to all Blog allows you to voice your opinion and concerns regarding today's agricultural scenario.</div></Link>
                                </div>
                            </div>
                            <div className="image5c">
                                    
                            </div>
                    </div>

                    <div className="description1">
                        <div className="image6a">
                        </div>
                        <div className="image6b rellax" data-rellax-speed="1">
                            <div className="boxContent linkStyle"><Link to = "/services/community">
                                    <div className="mlLine1">Question And Answers</div>
                                    <hr className = "line7" ></hr>
                                    <div className="mlLine2">With Agtech's immersive community experience, get access to a platform that providesone stop location to get answers to all your cumbersome problems with ease while helping others to realise their goals. </div>
                                            </Link>
                            </div>
                        </div>
                    </div>

                    
            </section>
    </div>


    <div className='page2'>
    <div className='background'></div>
   <div className='expertBox'>
       <div className='expertHeading'>Find Experts In Your Area</div>
     <form className='expertForm' onSubmit={this.locationHandler}>
         <input type='text/' value={this.state.location} className='expertInput' placeholder='Enter Your Location' onChange={this.onInputHandler}/>
     <button className='expertButton'>SEARCH</button>
     </form>
     <div className='expertInfoBox'><ExpertView experts={this.state.experts}/>
     <Link to='/services/experts' style={{zIndex:20,color:'blue',textDecoration:'none',fontFamily:'Arial'}}>Explore More...</Link>
     </div> 
   </div>
     </div>

     <div className='page3'>


     </div>
    </>)
    }

}
const ExpertView =({experts})=>{

if(experts.length===0){
    return(<div>No Experts in your area!</div>)
}
else{
  return( 
      experts.map((expert)=>{
      return(
       
        <div className='expertInfo'>
            <div className='imgContainer'>
                <img ></img>
            </div>
      <div className='expertName'>{expert.name}</div>
        </div>)})
      
    )}
}

export default HomeContainer;