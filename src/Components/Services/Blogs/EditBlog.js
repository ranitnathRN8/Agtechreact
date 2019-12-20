import React from 'react';
import Topbar from '../Topbar';
import './Blogs.css';

class EditBlog extends React.Component {
    // i expect 1)isBuyer 2)isLoggedIn 3)location 4)userId to be fetched from context or redux or anything
    state = {
        isLoggedIn: true, userId: 1234, EditMode: true,
        blog: {
            id: '',
            title: '',
            subject: '',
            createdOn: '',
            ownerId: '',
            ownerName: '',
            ownerEmail: '',
            likes: '',
            description: ''
        }
    }
    componentDidMount() {
      if(this.props.newMode){
          this.setState({EditMode:false});
      }  
      else if(this.props.editMode){
              const blog={
                id: this.props.blog.id,
                title: this.props.blog.title,
                subject: this.props.blog.subject,
                createdOn: this.props.blog.createdOn,
                ownerId: this.props.blog.ownerId,
                ownerName: this.props.blog.ownerName,
                ownerEmail: this.props.blog.ownerEmail,
                likes: this.props.blog.likes,
                description: this.props.blog.description
              };
              this.setState({blog:blog,EditMode:true});
            
       }
    }
    onTitleChange=(e)=>{
        e.preventDefault();
        let blog={...this.state.blog};
        blog.title=e.target.value;
        this.setState({blog:blog});
    }
    onSubjectChange=(e)=>{
        e.preventDefault();
        let blog={...this.state.blog};
        blog.subject=e.target.value;
        this.setState({blog:blog});
    }
    onEmailChange=(e)=>{
        e.preventDefault();
        let blog={...this.state.blog};
        blog.ownerEmail=e.target.value;
        this.setState({blog:blog});
    }
    // onBlogTopicChange=(e)=>{

    // } to be implemented after internet 
editFormSubmitHandler=(e)=>{
    e.preventDefault();
    this.props.editFormSubmitHandler(this.state.blog);
    this.setState({blog:{}});
}
createFormSubmitHandler=(e)=>{
    e.preventDefault();
    let date=new Date();
    const blog={
        // no need to give id
        id:'1234567890',
        title: this.state.blog.title,
        subject: this.state.blog.subject,
        createdOn: date.toLocaleDateString(),
        ownerId: this.state.userId,
        ownerName: this.state.blog.ownerName,
        ownerEmail: this.state.blog.email,
        likes: 0,
        description: this.state.blog.description,
        likePressed:false
    };
    this.props.newFormSubmitHandler(blog);
}

    render() {
         let Form=  (<><Topbar title = "Create Your Blog"/>
         <div className = "newBlog-container form-group row">
                <label for="colFormLabelSm" className = "col-sm-2 col-form-label col-form-label-sm newBlog-label" ><h4>Title:</h4></label>
                <div class="newBlog-inputs col-sm-10">
                    <input className = "form-control form-control-sm" required value={this.state.blog.title} onChange={this.onTitleChange}></input>
                </div>
                
                <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm newBlog-label"><h4>Subject</h4></label>
                <div class="newBlog-inputs col-sm-10">
                    <input className = "form-control form-control-sm" required value={this.state.blog.subject} onChange={this.onSubjectChange}></input>
                </div>
                
                <label for="colFormLabelSm" className = "col-sm-2 col-form-label col-form-label-sm newBlog-label"><h4>Email</h4></label>
                <div class="newBlog-inputs col-sm-10">
                    <input className = "form-control form-control-sm" type="email" required value={this.state.blog.ownerEmail} onChange={this.onEmailChange}></input>
                </div>
                
                <label for="colFormLabelSm" className = "col-sm-2 col-form-label col-form-label-sm newBlog-label"><h4>Post:</h4></label>
                <div class="newBlog-inputs col-sm-10"><textarea rows='10' cols='80'></textarea></div>
         <button type='submit' className="submitBlog">{this.state.EditMode?'I am done Editing':'Submit New Blog'}</button>
                </div></>)
            
    console.log(this.state.blog,this.state.EditMode);

    return (this.state.EditMode?<><form onSubmit={this.editFormSubmitHandler}> {Form}</form><button onClick={this.props.handleCloseClick} className='closeBlog'>Close</button></>:<><form onSubmit={this.createFormSubmitHandler}>{Form} </form><button onClick={this.props.handleCloseClick}className='closeBlog'>Close</button></>)
    }
}
export default EditBlog;