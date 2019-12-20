import React from 'react';
import axios from 'axios';
import './MyAccounts.css';

class AccountContainer extends React.Component {
    state = { currentFarmer: '', isLoggedIn: false, _id: '', firstname: '', lastname: '', email: '', location: '', crops: [{ name: 'rice', description: 'lorem ipsum dolar sit in my backyard', price: '2300' }, { name: 'rice', description: 'lorem ipsum dolar sit in my backyard', price: '2300' }] };

    componentDidMount() {
        if (localStorage.getItem('cool')) {
            this.setState({ isLoggedIn: true });
            let userId = localStorage.getItem('userId');
            let token = localStorage.getItem('cool');
            axios.get(`http://agtech.xydev.io/api/farmer/${userId}`).then((res) => {
                this.setState({ currentFarmer: res.data, _id: res.data._id, firstname: res.data.firstName, lastname: res.data.lastName, email: res.data.email, location: res.data.location });
                axios.get(`http://agtech.xydev.io/api/crop/farmer=${userId}`, { headers: { "Authorization": `Bearer ${token}` } }).then((response) => {
                    this.setState({ crops: response.data.orders });
                    axios.get(`http://agtech.xydev.io/api/appointment/farmer/me`, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                        console.log(res);
                        this.setState({ appointments: res.data.appointments });
                    })
                })

            }).catch((e) => {
                console.log('error in ', e);
            })
        }

    }
    addCrop = (crop) => {
        // axios request
        let token = localStorage.getItem('cool');
        axios.post('http://agtech.xydev.io/api/crop/create', { name: crop.name, description: crop.description, expPrice: crop.price }, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        }).catch((e) => {
            console.log('error in crop submit');
        })
        let crops = [...this.state.crops];
        crops.push(crop);
        this.setState({ crops: crops });
    }
    handleLocationSubmit = () => {
        let token = localStorage.getItem('cool');
        axios.patch('http://agtech.xydev.io/api/farmer/update/me', { location: this.state.location }, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            let currentFarmer = { ...this.state.currentFarmer };
            currentFarmer.location = this.state.location;
            this.setState({ currentFarmer: currentFarmer });
        }).catch((e) => {
            console.log('error in location', e);
        })
    }
    handleBioSubmit = () => {
        let token = localStorage.getItem('cool');
        axios.patch('http://agtech.xydev.io/api/farmer/update/me', { bio: this.state.bio }, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            let currentFarmer = { ...this.state.currentFarmer };
            currentFarmer.bio = this.state.bio;
            this.setState({ currentFarmer: currentFarmer });
        }).catch((e) => {
            console.log("error in bio", e);
        })
    }
    handleChangeLocation = (e) => {
        this.setState({ location: e.target.value });
    }
    handleChangeBio = (e) => {

        this.setState({ bio: e.target.value });
    }

    render() {
        let AccountView = (
        <div className="root">
            <div className="container">
            <div className='row' style={{ marginTop: '20vh', marginBottom: '20vh' }}>
                <div className="col col-md-3"></div>
                <div className="AccountBox" >
                    <div className='Accountrow' style={{ marginBottom: '3vh' }}><h1 className = "AccountHeading">My Account</h1></div>
                    <div className="Accountrow1">
                        <div className='col col-md-4' style ={{fontWeight: '800'}}>First Name:</div>
                        <div className='col col-md-8' style={{ marginBottom: '10px' }}>
                            {this.state.currentFarmer.firstName ? this.state.currentFarmer.firstName :
                                <><input className='form-control' style={{ marginBottom: '10px' }} placeholder='firstname' /><button className='btn btn-md btn-success ' onClick={this.handlefirstnameSubmit}>SUBMIT</button></>}
                        </div>
                        <div className='col col-md-4' style ={{fontWeight: '800'}}>Last Name:</div>
                        <div className='col col-md-8' style={{ marginBottom: '10px' }}>
                            {this.state.currentFarmer.lastName ? this.state.currentFarmer.lastName :
                                <><input className='form-control' style={{ marginBottom: '10px' }} placeholder='lastname' /><button className='btn btn-md btn-success' onClick={this.handlelastnameSubmit}>SUBMIT</button></>}
                        </div>
                        <div className='col col-md-4' style ={{fontWeight: '800'}}>Email Address:</div>
                        <div className='col col-md-8' style={{ marginBottom: '10px' }} >
                            {this.state.currentFarmer.email ? this.state.currentFarmer.email :
                                <><input className='form-control' style={{ marginBottom: '10px' }} placeholder='lastname' /><button className='btn btn-md btn-success' onClick={this.handlelastnameSubmit}>SUBMIT</button></>}
                        </div>
                        <div className='col col-md-4' style ={{fontWeight: '800'}}>Location:</div>
                        <div className='col col-md-8' style={{ marginBottom: '10px' }} >
                            {this.state.currentFarmer.location ? this.state.currentFarmer.location :
                                <><input className='form-control' onChange={this.handleChangeLocation} style={{ marginBottom: '10px' }} placeholder='location' /><button className='btn btn-md btn-success' onClick={this.handleLocationSubmit}>SUBMIT</button></>}
                        </div>
                        <div className='col col-md-4' style ={{fontWeight: '800'}}>Bio:</div>
                        <div className='col col-md-8' style={{ marginBottom: '10px' }} >
                            {this.state.currentFarmer.bio ? this.state.currentFarmer.bio :
                                <><input className='form-control' onChange={this.handleChangeBio} style={{ marginBottom: '10px' }} value={this.state.bio} placeholder='your bio here...' /><button className='btn btn-md btn-success' onClick={this.handleBioSubmit}>SUBMIT</button></>}
                        </div>
                        {/* <div className='col col-md-4'>Upcoming Appointments</div>
                        <div className='col col-md-8'><AppointmentList appointments={this.state.appointments} /></div> */}

                        <div className='col col-md-4' style ={{fontWeight: '800'}}>My Crops</div>
                        <div className='col col-md-8'><CropList crops={this.state.crops} addCrop={this.addCrop} /></div>

                        <div className='col col-md-4' style={{marginTop:'25px'}}>Upcoming Appointments</div>
                        <div className='col col-md-8'><AppointmentList appointments={this.state.appointments} /></div>


                    </div>
                </div>
                <div className='col col-md-3'></div>
            </div>
        </div>
        </div>
        )

        return (
            this.state.isLoggedIn ? <>{AccountView}</> : <button className='btn btn-primary btn-lg'>Please Login To Continue</button>
        )
    }

}
class AppointmentList extends React.Component {
    state = { appointments: [] }
    componentDidMount() {
        let activeAppointments = [];
        if (this.props.appointments) {
            let appointments = this.props.appointments;
            let activeAppointments = appointments.filter((appointment) => {
                console.log(appointment);
                return (appointment.confirmStatus)
            });
            this.setState({appointments:activeAppointments});
        }
        console.log(activeAppointments);
    }
    render() {
        if(this.state.appointments.length==0){
            return <div className='col col-12' style={{marginTop:'25px'}}>No Appointments Accepted</div>
        }
        // SHOW APPOINTMENTS WHICH ARE ACCEPTED ONLY
        let appointments=this.state.appointments;
        let list=appointments.map((appointment,i)=>{
            return(
            <div className='row' style={{marginBottom:'30px'}} key={i}>
        <div style={{fontWeight:'bold'}}className='col col-md col-8'>{appointment.expert.firstName} {appointment.expert.lastName}</div>
                  <div className='col col-md col-8'>{appointment.expert.email}</div>
                <em><div className='col col-md col-8'>{appointment.expert.expertise}</div></em>
            </div>)
        })
        return (
        <h1>{list}</h1>
        )
    }
}

class CropList extends React.Component {
    state = { showForm: false, name: '', description: '', price: '' }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }
    handlePriceChange = (e) => {
        this.setState({ price: e.target.value })
    }
    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }
    onCropFormSubmit = (e) => {
        e.preventDefault();
        this.props.addCrop({ name: this.state.name, price: this.state.price, description: this.state.description });
        this.setState({ showForm: false });
    }

    render() {
        let crops = this.props.crops.map((crop, i) => {
            return (<div className='row' style={{ marginBottom: '30px' }} key={i}>
                <div style={{ fontWeight: 'bold' }} className='col col-md col-8'>{crop.name}</div>
                <div className='col col-md col-8'>Rs.{crop.expPrice}</div>
                <em><div className='col col-md col-8'>{crop.description}</div></em>
            </div>)
        })

        let CropsForm = (<form className='form-group' onSubmit={this.onCropFormSubmit}>
            <input value={this.state.name} onChange={this.handleNameChange} style={{ marginBottom: '10px' }} className='form-control' placeholder='crop-name' type='text' />
            <input value={this.state.price} onChange={this.handlePriceChange} style={{ marginBottom: '10px' }} className='form-control' type='number' placeholder='crop-price' />
            <textarea value={this.state.dexription} onChange={this.handleDescriptionChange} style={{ marginBottom: '10px' }} cols='3' rows='5' className='form-control' type='text' placeholder='crop-description' />
            <button style={{ marginBottom: '10px', marginRight: '5px' }} type='submit' className='btn btn-sm btn-success'>Submit</button><button style={{ marginBottom: '10px' }} className='btn btn-sm btn-danger' type='button' onClick={() => this.setState({ showForm: false })}>Close</button>
        </form>)
        return (
            <>
                {crops}
                {this.state.showForm ? CropsForm : <button className='btn btn-primary btn-sm' onClick={() => this.setState({ showForm: true })}>Add New Crop</button>}
            </>
        )
    }
}


export default AccountContainer;