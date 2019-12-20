import React from 'react';
import Topbar from '../Topbar';
import { Link } from 'react-router-dom';
import EditBlog from './EditBlog';
import './Blogs.css';

// i expect 1)isBuyer 2)isLoggedIn 3)location 4)userId to be fetched from context or redux or anything
class BlogContainer extends React.Component {
    state = { blogs: [], isLoggedIn: false, userId: '', showOthersBlog: true, readBlog: false, editMode: false, newMode: false }
    currentBlogId = undefined;
    componentDidMount() {
        if(localStorage.getItem('cool')&&localStorage.getItem('userId')){
            this.setState({isLoggedIn:true,userId:localStorage.getItem('userId')});
        }
        //const blogs=Axios.get("http://localhost/api/blogs") to be implemented
        // implement likepressed in a logical sense
        const blogs = [{ id: 1234, title: 'Why is milk good for health', subject: 'this is a intro to milk production and its beneficiary', createdOn: '13/12/2019', ownerId: '1234', ownerName: 'jackass', ownerEmail: 'prachurjyabasistha@gmail.com', likes: 0, description: 'lorem ipsum this is the jsdksjdskDDOEWIJEIFHNKNCAMCMsacjksa th eajdsldkasdaasdasdado;lkwwjmxnnsjsdhODKANDJSHDWUHUDDHSNDjdKJl;j;jkjsdkj', likePressed: false },
        { id: 12345, title: 'Why is vegiiee good for health', subject: 'this is a intro to milk production and its beneficiary', createdOn: '13/12/2019', ownerId: '1234', ownerName: 'prachurjya', ownerEmail: 'prachurjyabasistha@gmail.com', likes: 56, description: 'lorem ipsum this is the jsdksjdskDDOEWIJEIFHNKNCAMCMsacjksa th eajdsldkasdaasdasdado;lkwwjmxnnsjsdhODKANDJSHDWUHUDDHSNDjdKJl;j;jkjsdkj', likePressed: false },
        { id: 123456, title: 'Why is meat good for health', subject: 'this is a intro to milk production and its beneficiary', createdOn: '13/12/2019', ownerId: '56565', ownerName: 'prachurjya', ownerEmail: 'prachurjyabasistha@gmail.com', likes: 58, description: 'lorem ipsum this is the jsdksjdskDDOEWIJEIFHNKNCAMCMsacjksa th eajdsldkasdaasdasdado;lkwwjmxnnsjsdhODKANDJSHDWUHUDDHSNDjdKJl;j;jkjsdkj', likePressed: true },
        { id: 1234567, title: 'Why is mutton good for health', subject: 'this is a intro to milk production and its beneficiary', createdOn: '13/12/2019', ownerId: '56565', ownerName: 'prachurjya', ownerEmail: 'prachurjyabasistha@gmail.com', likes: 58, description: 'lorem ipsum this is the jsdksjdskDDOEWIJEIFHNKNCAMCMsacjksa th eajdsldkasdaasdasdado;lkwwjmxnnsjsdhODKANDJSHDWUHUDDHSNDjdKJl;j;jkjsdkj', likePressed: false }
        ];
        this.setState({ blogs: blogs });

    }


    handleMyBlogsClick = () => {
        this.setState((prevState) => {
            return { showOthersBlog: !prevState.showOthersBlog }
        });
    }
    showBlogHandler = (blog) => {
        this.setState({ readBlog: true });
        const reqIndex = this.state.blogs.findIndex((b) => {
            return (b.id === blog.id);
        });
        const reqBlog = this.state.blogs[reqIndex];
        this.currentBlogId = reqBlog.id;
        console.log(this.currentBlogId);
    }
    hideBlogViewHandler = () => {
        this.setState({ readBlog: false });
        this.currentBlogId = undefined;

    }
    likeClickHandler = () => {
        let blogs = [...this.state.blogs];
        let bId = blogs.findIndex((b) => {
            return (b.id === this.currentBlogId);
        })
        let foundBlog = blogs[bId];
        if (foundBlog.likePressed) {
            foundBlog.likes--;
        }
        else {
            foundBlog.likes++;
        }
        foundBlog.likePressed = !foundBlog.likePressed;
        this.setState({ blogs: blogs });
        //    axios request to edit blog with id=bId
    }
    handleDeleteClick = () => {
        const presentBlogs = [...this.state.blogs];
        const blogs = presentBlogs.filter(b => {
            return this.currentBlogId !== b.id;
        })
        console.log(blogs);
        this.setState({ blogs: blogs });
        this.currentBlogId = undefined;
        this.hideBlogViewHandler();
        // i will have to implement a delete request here axios call
    }
    handleEditClick = () => {
        this.setState({ editMode: true });
    }
    handleCreateClick = () => {
        this.setState({ newMode: true, editMode: true });
    }
    handleCloseClick = () => {
        this.setState({ editMode: false });
    }
    editFormSubmitHandler = (blog) => {
        // axios request to edit the blogs with 'blog'
        const blogs = [...this.state.blogs];
        const reqId = blogs.findIndex((b) => {
            return (b.id === blog.id);
        })
        blogs[reqId] = blog;
        this.setState({ blogs: blogs, editMode: false });
    }
    newFormSubmitHandler = (blog) => {
        //const createdBlog=create request to axios
        const blogs = [...this.state.blogs];
        // push createdBlog
        blogs.push(blog);
        this.setState({ blogs: blogs, editMode: false, newMode: false });
    }
    handleDeleteFromList = (blog) => {
        const presentBlogs = [...this.state.blogs];
        const blogs = presentBlogs.filter(b => {
            return blog.id !== b.id;
        })
        console.log(blogs);
        this.setState({ blogs: blogs });
    }

    render() {
        //   for showing the list of blogs
        let stateBlogs = [...this.state.blogs];
        const userBlogs = stateBlogs.filter((blog) => {
            return (blog.ownerId === this.state.userId);
        })
        // const otherBlogs = this.state.blogs.filter((blog) => {
        //     return (blog.ownerId !== this.state.userId);
        // })

        let toggleReadList = (<>
            <Topbar title="Blogs" />
            <div className="container">
                <div className="page-header" style={{ fontSize: '23px' }}>
                    
                <div className= "initial1">
            
            {/* <div className="partb">Equipments</div> */}
    <hr className = "line1"></hr>
    <br></br><br></br>
    <div className="mlDesc1">Voice your concerns regarding today's agricultural scenario. 
    Your knowledge regarding even the meagre of components can help others significantly. 
    </div>
    <br></br>

    

    
</div>
                    
                    </div>
                {this.state.isLoggedIn ? <><button onClick={this.handleMyBlogsClick} className="blog-goToMine-button">{this.state.showOthersBlog ? "My Blogs>>>" : '<<< All Blogs'}</button>{this.state.showOthersBlog ? <BlogsList blogs={this.state.blogs} showButtons={false} showBlogHandler={this.showBlogHandler} /> : <BlogsList blogs={userBlogs} showButtons={true} userId={this.state.userId} showBlogHandler={this.showBlogHandler} createNewHandler={this.handleCreateClick} handleEditClick={this.handleEditClick} handleDeleteFromList={this.handleDeleteFromList} />}</> : <Link to="/login"><button className='blog-goToMine-button'>Login to continue...</button></Link>}


            </div>
        </>)
        //   for displaying one blog
        if (this.currentBlogId) {
            var currentBlog = undefined;
            let blogs = [...this.state.blogs];
            const reqBlogIndex = blogs.findIndex((blog) => {
                return (blog.id === this.currentBlogId);
            });
            currentBlog = blogs[reqBlogIndex];
            console.log('current blog', currentBlog);
            if (currentBlog.ownerId === this.state.userId) {
                currentBlog.isOwner = true;
            }
            else {
                currentBlog.isOwner = false;
            }

        }

        if (currentBlog) {
            var buttonColor = 'btn-success';
            if (currentBlog.likePressed) {
                buttonColor = 'btn-danger';
            }

            var Blog = (<><div className='jumbotron'>
                <h1>{currentBlog.title}</h1>
                <h2>by: {currentBlog.ownerName}</h2>
                <h3>created on:{currentBlog.createdOn}</h3>
            </div><div className='centered row'>
                    <div className="col md-12">
                        {currentBlog.description};
</div>
                </div>
                <button className={`btn btn-lg ${buttonColor}`} onClick={this.likeClickHandler}>{currentBlog.likePressed ? 'UnLike' : 'Like'}  <span className='badge'>{currentBlog.likes}</span></button>
            </>
            )
            var Buttons = undefined;
            if (currentBlog.isOwner) {
                Buttons = (<><button className='btn btn-lg btn-primary' onClick={this.handleEditClick}>Edit</button>
                    <button className='btn btn-lg btn-danger' onClick={this.handleDeleteClick}>Delete</button></>)
            }
        }
        return (
            this.state.editMode ? <EditBlog editMode={this.state.editMode} newMode={this.state.newMode} blog={currentBlog} handleCloseClick={this.handleCloseClick} editFormSubmitHandler={this.editFormSubmitHandler} newFormSubmitHandler={this.newFormSubmitHandler} /> 
            : this.state.readBlog ? 
            <div className='container'>{Blog} <div className='row'>{Buttons}</div> <div className='row'><button className='btn btn-lg btn-warning' onClick={this.hideBlogViewHandler}>Continue Browsing Other Blogs</button></div> </div> 
            : <div>{toggleReadList}</div>


        )
    }
}




const BlogsList = ({ blogs, showButtons, userId, showBlogHandler, createNewHandler, handleEditClick, handleDeleteFromList }) => {
    let blogItem = undefined;
    let addNewButton = undefined
    if (blogs.length === 0) {
        blogItem = <h1 className = "No-blog">- NO BLOG TO SHOW -</h1>
    }
    else {
        blogItem = blogs.map((blog) => {
            return <BlogItem handleEditClick={handleEditClick} handleDeleteFromList={handleDeleteFromList} className='col-md-12' showButtons={showButtons} key={blog.id} blog={blog} showBlogHandler={showBlogHandler} />
        })
    }
    if (showButtons) {
        addNewButton = (<div className='col-md-12 m-3'><button onClick={createNewHandler} className='add-new-button'>ADD NEW</button></div>)
    }

    return (<div className="row">{addNewButton} {blogItem} </div>)

}

const BlogItem = ({ blog, showButtons, showBlogHandler, handleEditClick, handleDeleteFromList }) => {
    let Button1 = undefined;
    let Button2 = undefined;
    if (showButtons) {
        Button1 = (<><button className='btn btn-lg btn-primary' onClick={() => handleEditClick()}>Edit</button></>)
        Button2 = (<button className='btn btn-lg btn-danger' onClick={() => { handleDeleteFromList(blog) }}>Delete</button>);
    }

    return (<><div style={{ cursor: 'pointer' }} onClick={() => showBlogHandler(blog)} className="row"><div to="blog/" className="col-md-12"><h1 className = "Blog-heading">{blog.title}</h1>
        <h2 className = "blog-subject">{blog.subject}</h2>
        <div className = 'blog-details'>
            <div className = "blog-creation">Created By: {blog.ownerName}</div>
            <div className = "blog-date">Created on: {blog.createdOn}</div>
            <div className = "blog-likes">Likes:  {blog.likes}</div>
            </div>
    </div><div>{Button1}</div></div>{Button2}<hr className = "blog-line"></hr></>)
}
export default BlogContainer;