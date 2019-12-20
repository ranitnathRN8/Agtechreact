import React from 'react';
import Topbar from '../Topbar';
import { Link } from 'react-router-dom';
import './Equipments.css';
// import axios from 'axios';
class Equipments extends React.Component {
    // i expect 1)isBuyer 2)isLoggedIn 3)location 4)userId to be fetched from context or redux or anything
    state = {
        isLoggedIn: false, isBuyer: true, location: 'lankeswar', userId: '1234', showForm: false, currEquipment: '',
        equipments: []
    }

    // to be implemented after receiving backend
    componentDidMount() {
        if (localStorage.getItem('cool') && localStorage.getItem('userId')) {
            this.setState({ isLoggedIn: true, userId: localStorage.getItem('userId') });
        }
        // let allEquipments=axios.get("localhost:1234/api/equipments");
        let allEquipments = [{ location: 'lankeswar', name: 'Harvester', id: '1', price: '$1200', img: '../../../Assets/harvester.png', description: 'Best deals guarateed!', userId: '1234', contact: '0932320321' },
        { location: 'lankeswar', name: 'spade', id: '2', price: '$1300', img: '../../../Assets/Asset1.svg', description: 'Best deals guarateed!', userId: '1234', contact: '9865432' },
        { location: 'lankeswar', name: 'crowbar', id: '3', price: '$200', img: '../../../Assets/Asset1.svg', description: 'Best deals guarateed!', userId: '5678', contact: '98291301' },
        { location: 'lankeswar', name: 'crane', id: '4', price: '$10000', img: '../../../Assets/Asset1.svg', description: 'Best deals guarateed!', userId: '14567', contact: '0129112' }
        ]
        let equipments = allEquipments.filter((equipment) => {
            return (equipment.location === this.state.location)
        })
        this.setState((prevState) => {
            return { equipments: equipments }
        })
        console.log(typeof localStorage.getItem('userId'));
        console.log(typeof this.state.userId);
    }

    onFormSubmit = (equipment) => {
        let equipments = [...this.state.equipments];
        const findID = equipments.findIndex((e) => {
            return (equipment.id === e.id);
        })
        console.log(this.state.equipments[findID]);
        equipments[findID] = equipment;
        equipments[findID].price = `$ ${equipments[findID].price}`
        this.setState({ equipments: equipments });
        //   Axios.edit('http://localhost:1234/api',{equipment})
    }
    onDelete = (equipment) => {

        let equipments = [...this.state.equipments];
        const filterEquipments = equipments.filter((e) => {
            return (equipment.id !== e.id);
        })
        this.setState({ equipments: filterEquipments })
        // Axios.delete()
    }
    onNewSubmit = (equipment) => {
        let equipments = [...this.state.equipments];
        equipments.push(equipment);
        this.setState({ equipments: equipments });
        //  Axios.post("")
    }
    showBookForm = (equipment) => {
        this.setState({ showForm: true, currEquipment: equipment });
    }
    handleBookSubmit=(bookinfo)=>{
        // axios request
        console.log(bookinfo);
        this.setState({showForm:false,currEquipment:''});
    }
    handleBookClose=()=>{
        this.setState({showForm:false,currEquipment:''});
    }

    render() {
        return (
            this.state.showForm ? (<BookForm closeHandler={this.handleBookClose} handleBookSubmit={this.handleBookSubmit} equipment={this.state.currEquipment} />) :
                (<>
                    <Topbar title="Equipments" />
                    <div className='container'>
                        <div className="page-header" style={{ fontSize: '23px' }}>
                        <div className= "initial1">
            
            {/* <div className="partb">Equipments</div> */}
    <hr className = "line1"></hr>
    <br></br><br></br>
    <div className="mlDesc1">With the help of AgTech’s Equipment Hiring platform, 
        farmers will be capable to meet their requirements for new and standard equipments necessary for production easily.<br></br>
        Also businesses and other farmers who are in possession of equipments that they do not require instantly will be able to help those who are in need while generating revenue.</div>
    <br></br>

    

    
</div>
                            </div>
                        {this.state.isLoggedIn ?
                            this.state.isBuyer ? <BuyersEquipment showBookForm={this.showBookForm} equipments={this.state.equipments} /> : <SellersEquipments equipments={this.state.equipments} userId={this.state.userId} onFormSubmit={this.onFormSubmit} onDelete={this.onDelete} onNewSubmit={this.onNewSubmit} />
                            : <Link to="/login"><button className="btn btn-lg btn-primary">Login To Continue</button></Link>}
                    </div>
                </>))
    }
}
class BookForm extends React.Component {
    state = { days: '',qty:'',date:''}
    daysChangeHandler=(e)=>{
        this.setState({days:e.target.value});
    }
    qtyChangeHandler=(e)=>{
        this.setState({qty:e.target.value});
    }
    dateChangeHandler=(e)=>{
        this.setState({date:e.target.value});
    }
    formSubmitHandler=(e)=>{
        e.preventDefault();
        let bookinfo={
            days:this.state.days,
            date:this.state.date,
            qty:this.state.qty
        }
          this.props.handleBookSubmit(bookinfo);
          this.setState({days:'',qty:'',date:''});
    }

    


    render() {
        return (
            <div className='container' >
                <div className="row" style={{marginTop:'25vh'}}>
                <div ></div>
                <div className='book-bg'>
                    <h1>Book Your Items</h1>
                    <form onSubmit={this.formSubmitHandler}>
                        <div class="form-group">
                            <label style = {{marginRight: '10px'}}>Number of Days Required</label>
                            <input value={this.state.days} type="number"  className="input-control" id="exampleInputEmail1" onChange={this.daysChangeHandler}/>
                        </div>
                        <div class="form-group">
                            <label style = {{marginRight: '10px'}}>Quantity Required</label>
                            <input value={this.state.qty} type='number' className="input-control" id="exampleInputPassword1" onChange={this.qtyChangeHandler}/>
                        </div>
                        <div className="form-group">
                        <label style = {{marginRight: '10px'}}>Date Required</label>
                        <input value={this.state.date} type='date' onChange={this.dateChangeHandler}></input>
                        </div>
                        <div className="form-group">
                        <button type="submit" class="btn btn-success">Submit</button></div>
                        <div className="form-group">
                        <button type="button" class="btn btn-danger" onClick={this.props.closeHandler}>Close</button></div>
                    </form>
                </div>
                <div className='col col-md-4'></div>
                </div>
            </div>
        )
    }

}

const BuyersEquipment = ({ equipments, showBookForm }) => {
    const equipmentDisp = equipments.map((equipment) => {
        return (<div className="col-md-6" key={equipment.id}>
            
            <h1 className = "product-name">{equipment.name}</h1>
            <h2 className = "product-price">Price: {equipment.price}</h2>
            <div style={{ width: '20vw', height: '30vh', background: '#bada55', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <h3>{equipment.description}</h3>
            <button style={{ margin: '20px' }} onClick={() => showBookForm(equipment)} className="btn btn-lg btn-success">BOOK</button>
        </div>)
    })

    return (<div className="row">{equipments.length > 0 ? equipmentDisp : <h2 col-lg-12>No Equipments in your region</h2>}</div>)
}


const SellersEquipments = ({ equipments, userId, onFormSubmit, onDelete, onNewSubmit }) => {
    const sellerEquipments = equipments.filter((equipment) => {
        console.log(userId);
        console.log(equipment.userId);
        return (equipment.userId === userId);
    })
    console.log(sellerEquipments);
    const equipmentsDisp = sellerEquipments.map((equipment) => {
        return (
            <ToggleAbleEditDisp key={equipment.id} equipment={equipment} onFormSubmit={onFormSubmit} onDelete={onDelete} />
        )
    })

    return (<div className="row">
        {equipmentsDisp}
        <ToggleAbleButtonForm userId={userId} onFormSubmit={onNewSubmit} />
    </div>)
}

class ToggleAbleButtonForm extends React.Component {
    state = { name: '', price: '', description: '', contact: '', fileUrl: '', location: '', formDisplay: false, userID: this.props.userId };
    showForm = () => {
        this.setState({ formDisplay: true });
    }
    nameChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }
    priceChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ price: `${e.target.value}` });
    }
    despChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ description: e.target.value });
    }
    contactChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ contact: e.target.value });
    }
    locationChangeHandler = (e) => {
        e.preventDefault();
        this.setState({ location: e.target.value });
    }
    formClose = () => {
        this.setState({ formDisplay: false });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.formClose();
        this.props.onFormSubmit({ name: this.state.name, price: `$ ${this.state.price}`, description: this.state.description, contact: this.state.contact, img: '../../', userId: this.props.userId, location: this.state.location });
        this.setState({ name: '', price: '', description: '', contact: '', img: '', userId: '', location: '' })
    }

    render() {
        if (!this.state.formDisplay) {
            return (<button className="btn btn-success btn-lg" onClick={this.showForm}>ADD NEW</button>)
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">NAME</label>
                    <input required type="text" value={this.state.name} onChange={this.nameChangeHandler} />
                    <label htmlFor="name">Price</label>
                    <input required type="text" value={this.state.price} onChange={this.priceChangeHandler} />
                    <label htmlFor="name">Description</label>
                    <input required type="text" value={this.state.description} onChange={this.despChangeHandler} />
                    <label htmlFor="name">Contact</label>
                    <input required type="text" value={this.state.contact} onChange={this.contactChangeHandler} />
                    <label htmlFor="name">Location</label>
                    <input required type="text" value={this.state.location} onChange={this.locationChangeHandler} />
                    <input type="file" />
                    <button type="submit" className="btn btn-lg btn-success">SUBMIT</button>
                    <button className="btn btn-lg btn-danger" onClick={this.formClose}>CLOSE</button>

                </form>
            )
        }
    }
}

class ToggleAbleEditDisp extends React.Component {
    state = { showForm: false, equipment: {} }
    componentDidMount() {
        this.setState({ equipment: this.props.equipment });
    }


    handleEditClick = () => {
        this.setState({ showForm: true });
    }

    closeForm = () => {
        this.setState({ showForm: false });
    }

    submitHandler = (equipment) => {
        this.closeForm();
        this.props.onFormSubmit(equipment);
    }
    handleDeleteClick = () => {
        this.props.onDelete(this.state.equipment);
    }

    nameChangeHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        let equipment = { ...this.state.equipment };
        equipment.name = value;
        this.setState({ equipment: equipment });
    }
    priceChangeHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        let equipment = { ...this.state.equipment };
        equipment.price = `${value}`;
        this.setState({ equipment: equipment });
    }
    despChangeHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        let equipment = { ...this.state.equipment };
        equipment.description = value;
        this.setState({ equipment: equipment });
    }
    contactChangeHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        let equipment = { ...this.state.equipment };
        equipment.contact = value;
        this.setState({ equipment: equipment });
    }

    locationChangeHandler = (e) => {
        e.preventDefault();
        let value = e.target.value;
        let equipment = { ...this.state.equipment };
        equipment.location = value;
        this.setState({ equipment: equipment });
    }


    render() {
        const { equipment } = this.state;


        const equipmentDisp = (<div className="col-md-6">
            <h1>{equipment.name}</h1>
            <h2>Price:{equipment.price}</h2>
            <div style={{ width: '400px', height: '350px', background: '#bada55', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <h3>{equipment.description}</h3>
            <button style={{ margin: '20px' }} className="btn btn-lg btn-primary" onClick={this.handleEditClick}>Edit</button>
            <button style={{ margin: '20px' }} className="btn btn-lg btn-warning" onClick={this.handleDeleteClick}>Mark As Sold</button>
            <button style={{ margin: '20px' }} className="btn btn-lg btn-danger" onClick={this.handleDeleteClick}>Delete</button>
        </div>)

        const EditForm = (<form className="form" onSubmit={() => this.submitHandler(this.state.equipment)}>
            <label>NAME</label>
            <input required type="text" value={equipment.name} onChange={this.nameChangeHandler}></input>
            <label htmlFor="price">Price</label>
            <input required type="text" value={equipment.price} onChange={this.priceChangeHandler} />
            <label htmlFor="">Description</label>
            <input required name="description" value={equipment.description} type="text" onChange={this.despChangeHandler} />
            <label htmlFor="phno.">Contact</label>
            <input required type="text" value={equipment.contact} onChange={this.contactChangeHandler} />
            <label htmlFor="location">Location</label>
            <input required type="text" value={equipment.location} onChange={this.locationChangeHandler} />
            <input type="file" />
            <button className='btn btn-success btn-lg' type="submit">Submit</button>
            <button className='btn btn-danger btn-lg' onClick={this.closeForm}>Close</button>
        </form>)

        return (this.state.showForm ? EditForm : equipmentDisp);
    }
}





export default Equipments;