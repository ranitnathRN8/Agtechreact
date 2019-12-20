import React from 'react';
import Topbar from '../Topbar';
import axios from 'axios';
import './Distributors.css';

class DistributorsContainer extends React.Component {
    state = { isLoggedIn: false,showForm:false,crops:[],cropName:'tomato',location:'',description:'',quantity:'',showResult:false,result:'',predictResponse:'',showResponse:false};
    componentDidMount() {
        console.log(localStorage.getItem('cool'));
        this.setState({ isLoggedIn: true });
        axios.get('http://agtech.xydev.io/api/crop/prices').then((res) => {
            console.log(res.data);
            console.log(Object.keys(res.data));
            this.setState({crops:Object.keys(res.data)});
        }).catch((e) => {
            console.log(e);
        })
    }
    handleNameChange=(e)=>{
        this.setState({cropName:e.target.value});
    }
    handleQtyChange=(e)=>{
        this.setState({quantity:e.target.value});
    }
    handleDescriptionChange=(e)=>{
        this.setState({description:e.target.value});
    }
    handleLocationChange=(e)=>{
        this.setState({location:e.target.value});
    }
    showBookingForm=(e)=>{
        this.setState({showForm:true,showResponse:false});
    }
    firstFormHandler=(e)=>{
        e.preventDefault();
        console.log(this.state.cropName);
        let crop={ name:'onions',
        quantity:this.state.quantity }
        axios.post('http://agtech.xydev.io/api/crop/price/predict',{
           
               name:this.state.cropName,
               quantity:this.state.quantity
            
          }).then((res)=>{
            console.log(res.data.data);
            this.setState({predictResponse:res.data.data,showResponse:true})
        }).catch((e)=>{
            console.log("errorr",e);
        })

    }
    handleFormSubmit=(e)=>{
        e.preventDefault();
        let token=localStorage.getItem('cool');
        axios.post('http://agtech.xydev.io/api/dist-request/create',{location:this.state.location,cropName:this.state.cropName,description:this.state.description,quantity:this.state.quantity},{ headers: {"Authorization" : `Bearer ${token}`} }).then((res)=>{
               console.log(res);
               this.setState({showForm:false,showResponse:false,cropName:'',location:'',description:'',quantity:''});
        }).catch((e)=>{
            console.log("error",e);
        })
    }
    closeBookingForm=()=>{
        this.setState({showResponse:false});
    }
   
    render() {
        console.log(this.state.crops);

        let OptionMenu=(
            this.state.crops.map((crop,i)=>{
           return( <option key={i} value={crop}>{crop}</option>)
            })
        )
       let DistributionForm=(
          <div className='container'>
              <div className="row">
                  <div className='col col-md-3'></div>
           <div className='col col-md-6'>
              <form onSubmit={this.handleFormSubmit}>
                 <div className='formControl2'>
                     <label className = "distributionLabel">Enter Your Crop name</label>
                     <select  className = "distributionInput" defaultValue={this.state.cropName} onChange={this.handleNameChange}>
                         {OptionMenu}
                    </select>      
                </div>      
                <div className='formControl2'>
                     <label className = "distributionLabel">Description of your Crop</label>
                     <input className = "distributionInput" type='text' value={this.state.description} onChange={this.handleDescriptionChange}></input>      
                </div>    
                <div className='formControl2'>
                     <label className = "distributionLabel">location</label>
                     <input className = "distributionInput" type='text' value={this.state.location} onChange={this.handleLocationChange}></input>      
                </div>
                <div className='formControl2'>
                     <label className = "distributionLabel">Quantity</label>
                     <input className = "distributionInput" type='number' value={this.state.quantity} onChange={this.handleQtyChange}></input>      
                </div> 
                <button type='submit' style = {{marginRight: '20px'}} className='btn btn-lg btn-success'>Request</button>   
                <button type='button' className='btn btn-lg btn-danger' onClick={()=>this.setState({showForm:false})}>Close</button>                
          </form>
          </div>
          <div className='col col-md-3'></div>

          </div>
          </div>
       )
      
            
       
        return (
            <>
                <Topbar title='Distribution' />
                <div className='container'>
                        <div className="page-header" style={{ fontSize: '23px' }}>
                            <div className= "initial1">
            
            {/* <div className="partb">Equipments</div> */}
    <hr className = "line1"></hr>
    <br></br><br></br>
    <div className="mlDesc1">Get access to better quality seeds and better services 
                                            in your vicinity at a more affordable rate. 
                                            AgTech latches you to the most suitable dealer 
                                            for your needs while nullifying unnecessary middlemen charges.
                                            AgTech promises you an increased revenue generation though creative monitoring of market rates and maintainence of a network between the farmeres and businesses.</div>
    <br></br>

    

    
</div>
                            </div></div>
                {!this.state.isLoggedIn ? <button className='btn btn-lg btn-primary'>Login To Continue..</button> :
          this.state.showForm?  <> {DistributionForm}</> :this.state.showResponse?<PredictResponse predictResponse={this.state.predictResponse} showBookingForm={this.showBookingForm} closeBookingForm={this.closeBookingForm} />:<div className='container'>
                    <div className='row'>
                        <div className='col col-md-3'></div>
                        <div className='col col-md-5'>
                            <div className='form-group'>
                    <form onSubmit={this.firstFormHandler}>
                        <div className='formControl'>
                            <label className = "distributionLabel">Crop Name</label>
        <select className = "distributionSelection" onChange={this.handleNameChange} value={this.state.cropName}>{OptionMenu}</select>
                        

                        {/* <div className='formControl'> */}
                            <label className = "distributionLabel">Crop Quantity</label>
        <input value={this.state.quantity} type='number' onChange={this.handleQtyChange}></input>
                        </div>
<button className='btn btn-success btn-lg' type='submit'>Predict</button>
                    </form></div>
                    </div>
                    <div className='col col-md-3'></div>
                </div>
                </div>
                }
            </>)
    }


}

let PredictResponse=(props)=>{
    console.log('predict ',props.predictResponse)
    return(
        <div className="container">
            <div className="row">
                <div className='col col-md-3'></div>
                <div className='col col-md-6'>
                    <div className='formControl1'>
                        <div className = 'flow-contents'>
                        <div className='col col-md-6'><h3>Rate</h3></div>
    <div className='col col-md-6'><h3>{props.predictResponse.rate}</h3></div>
                    {/* </div>
                    <div className='row'> */}
                        <div className='col col-md-6'><h3>Your Revenue</h3></div>
    <div className='col col-md-6'><h3>{props.predictResponse.farmerRevenue}</h3></div>
                    {/* </div>
                    <div className='row'> */}
                        <div className='col col-md-6'><h3>Distribution Cost</h3></div>
    <div className='col col-md-6'><h3>{props.predictResponse.distCost}</h3></div>
                    {/* </div>
                    <div className='row'> */}
                        <div className='col col-md-6'><h3>Total</h3></div>
    <div className='col col-md-6'><h3>{props.predictResponse.total}</h3></div>
    </div>
                    </div>
                    
                    <button className='btn btn-primary btn-md' style = {{marginRight: '20px'}}onClick={props.showBookingForm}>REQUEST A BOOKING</button>
                    <button className='btn btn-danger btn-md' onClick={props.closeBookingForm}>CLOSE</button>
                   
                </div>
                <div className='col col-md-3'></div>
            </div>
        </div>
    )
} 


//  let Results=(
//           this.state.request?(<div className='container'>
//           <table className='table table-hover'>
//               <tbody>
//                   <tr>
//                       <td>Confirm Status</td>
//                       <td>{this.state.request.confirmStatus}</td>
//                   </tr>
//                   <tr>
//                       <td>Payment Confirmation</td>
//                       <td>{this.state.request.paymentStatus}</td>
//                   </tr>
//                   <tr>
//                       <td>Farmer Revenue</td>
//                       <td>{this.state.request.farmerRevenue}</td>
//                   </tr>
//                   <tr>
//                       <td>Rate</td>
//                       <td>{this.state.request.rate}</td>
//                   </tr>
//                   <tr>
//                       <td>Distribution Cost</td>
//                       <td>{this.state.request.distCost}</td>
//                   </tr>
//                   <tr>
//                       <td>Total</td>
//                       <td>{this.state.request.total}</td>
//                   </tr>
//               </tbody>

//           </table>
//       </div>):undefined
           
//        )

export default DistributorsContainer;