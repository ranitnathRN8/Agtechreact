import React from 'react';
import {Link} from'react-router-dom';
import './Community.css';
import Topbar from '../Topbar';

class CommunityContainer extends React.Component{
      // i expect 1)isBuyer 2)isLoggedIn 3)location 4)userId to be fetched from context or redux or anything
state={questions:[],userId:1234,isLoggedIn:false,readMode:false,createMode:false,editMode:false,replyMode:false,showMyQuestions:false}

componentDidMount(){
//questions=axios call to get all questions 
console.log(this.props);
if(localStorage.getItem('cool')&&localStorage.getItem('userId')){
    this.setState({isLoggedIn:true,userId:Number(localStorage.getItem('userId'))});
}
const questions=[{id:1,ownerId:1234,ownerName:'prachu',createdOn:'14/12/2019',question:'What is the best way to write react',
replies:[{id:123,ownerId:123456,ownerName:'ramu',createdOn:'15/12/2019',answer:'full stack react is a good one',upvotes:2,downvotes:0,upvotePressed:[12345,12121],downvotePressed:[]}]},

{id:2,ownerId:134,ownerName:'dhar',createdOn:'14/12/2019',question:'What is the best way to write vue',
replies:[{id:123,ownerId:123456,ownerName:'ramu',createdOn:'15/12/2019',answer:'full stack vue is a good one',upvotes:4,downvotes:2,upvotePressed:[1234,1212,1278,1212],downvotePressed:[2312,9909]}]},

{id:3,ownerId:124,ownerName:'sarma',createdOn:'14/12/2019',question:'What is the best way to write angular',
replies:[{id:123,ownerId:16,ownerName:'ramu',createdOn:'15/12/2019',answer:'full stack angular is a good one',upvotes:1,downvotes:0,upvotePressed:[12345],
downvotePressed:[]},{id:12390,ownerId:136,ownerName:'shamu',createdOn:'15/12/2019',answer:'intro angular 2 is a good one',upvotes:3,downvotes:1,upvotePressed:[12345,1567,1789],
downvotePressed:[1234]},{id:12311,ownerId:1236,ownerName:'karma',createdOn:'15/12/2019',answer:' angular 3 is a good one',upvotes:3,downvotes:0,upvotePressed:[12345,12345,9128],
downvotePressed:[]}]}
]

this.setState({questions:questions});
if(this.props.match.params.qid){
    this.setState({readMode:true});
}



}

handleNewClick=()=>{
    this.setState({createMode:true});
}
turnReadModeOn=()=>{
this.setState({readMode:true});
}
voteHandler=(vote,question,reply)=>{
let questions=[...this.state.questions];
let reqId=questions.findIndex((q)=>{
    return(q.id===question.id);
})
let reqQuestion=questions[reqId];
let replyId=reqQuestion.replies.findIndex((r)=>{
return(r.id===reply.id);
})
let foundReply=reqQuestion.replies[replyId];
if(vote==='upvote'){
    if(!foundReply.upvotePressed.includes(this.state.userId)&&!(foundReply.downvotePressed.includes(this.state.userId))){
        foundReply.upvotePressed.push(this.state.userId);
        foundReply.upvotes++;
    }
    else if(foundReply.upvotePressed.includes(this.state.userId)&&!(foundReply.downvotePressed.includes(this.state.userId))){
        let updatedReplyPress=foundReply.upvotePressed.filter((id=>{
            return(id!==this.state.userId);
        }))
        foundReply.upvotePressed=updatedReplyPress;
        foundReply.upvotes--;
    }
    else if(!foundReply.upvotePressed.includes(this.state.userId)&&(foundReply.downvotePressed.includes(this.state.userId))){
        let updatedReplyPress=foundReply.downvotePressed.filter((id=>{
            return(id!==this.state.userId);
        }))
        foundReply.downvotePressed=updatedReplyPress;
        foundReply.downvotes--;
        foundReply.upvotePressed.push(this.state.userId);
        foundReply.upvotes++;
    }
}
else if(vote==='downvote'){
    if(!foundReply.upvotePressed.includes(this.state.userId)&&!(foundReply.downvotePressed.includes(this.state.userId))){
        foundReply.downvotePressed.push(this.state.userId);
        foundReply.downvotes++;
    }
    else if(foundReply.downvotePressed.includes(this.state.userId)&&!(foundReply.upvotePressed.includes(this.state.userId))){
        let updatedReplyPress=foundReply.downvotePressed.filter((id=>{
            return(id!==this.state.userId);
        }))
        foundReply.downvotePressed=updatedReplyPress;
        foundReply.downvotes--;
    }
    else if(foundReply.upvotePressed.includes(this.state.userId)&&!(foundReply.downvotePressed.includes(this.state.userId))){
        let updatedReplyPress=foundReply.upvotePressed.filter((id=>{
            return(id!==this.state.userId);
        }))
        foundReply.upvotePressed=updatedReplyPress;
        foundReply.upvotes--;
        foundReply.downvotePressed.push(this.state.userId);
        foundReply.downvotes++;
    }

}
this.setState({questions:questions});
}
replySubmitHandler=(question,reply)=>{
const questions=[...this.state.questions];
const reqId=questions.findIndex((q)=>{
    return(q.id===question.id);
});
const reqQuestion=questions[reqId];

reqQuestion.replies.push(reply);

this.setState({question:questions});
}

questionSubmitHandler=(question)=>{
    // axios create request
const questions=[...this.state.questions];
questions.push(question);
this.setState({questions:questions,createMode:false});
console.log(this.state.questions);
}
toggleShowMyQuestions=()=>{
    this.setState({showMyQuestions:!this.state.showMyQuestions});
}
handleCloseClick=()=>{
    this.setState({createMode:false});
}
handleDeleteClick=(question)=>{
    const questions=[...this.state.questions];
    const remainQuestions=questions.filter((q)=>{
        return (q.id!==question.id);
    });
    console.log(remainQuestions);
    this.setState((prevState,prevprops)=>{
       return {questions:remainQuestions,readMode:false}

    },this.goBack);
}
goBack=()=>{
    if(this.props.match.params.qid){
        this.props.history.goBack();
    }
    return;
}

editHandler=()=>{
    this.setState({editMode:true});
}
editFormHandler=()=>{
    
}

render(){
    let currentQuestion=undefined;
    if(this.props.match.params.qid && this.state.readMode){
        const questions=[...this.state.questions];
     const findIndex=questions.findIndex((q)=>{
          return(q.id===Number(this.props.match.params.qid));
     })
     currentQuestion=questions[findIndex];
     console.log(currentQuestion);
    }

     const TopbarCompo=(<><Topbar title='Community'/>
     <div className='container'><div className="page-header" style={{ fontSize: '23px' }}>

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
     {this.state.isLoggedIn?<button className='comm-button' onClick={this.toggleShowMyQuestions}>{this.state.showMyQuestions?'All Questions':'My Questions'}</button>:undefined}
   
     </div>
     </>)

        return(this.state.createMode?
        <CreateForm questionSubmitHandler={this.questionSubmitHandler} userId={this.state.userId} handleCloseClick={this.handleCloseClick}/>
        :this.state.readMode?
        <ToggleReadEditView editMode={this.state.editMode} editHandler={this.editHandler} editFormHandler={this.editFormHandler} userId={this.state.userId} question={currentQuestion} voteHandler={this.voteHandler} replySubmitHandler={this.replySubmitHandler} handleDeleteClick={this.handleDeleteClick}/>:
        <>{TopbarCompo}
        {!this.state.isLoggedIn?<><Link to='/login'><button className='btn btn-lg btn-primary'>Login to Continue</button></Link></>:
<QuestionList userId={this.state.userId} questions={this.state.questions} showMyQuestions={this.state.showMyQuestions} turnReadModeOn={this.turnReadModeOn} handleNewClick={this.handleNewClick} handleDeleteClick={this.handleDeleteClick}/>}</>)
    
}

}

const QuestionList=({userId,questions,showMyQuestions,turnReadModeOn,handleNewClick,handleDeleteClick})=>{
let toggleQuestions=questions;
let onDeletePress=(q)=>{
handleDeleteClick(q);
}

if(showMyQuestions){
    toggleQuestions=questions.filter((q)=>{
        return(q.ownerId===userId);
    })
}
if(toggleQuestions.length===0){
    return <h1 className = "NoQuestions">No questions to show!</h1>
}
else{
return(
   < div className='container'><button onClick={handleNewClick}className='askQ-button'>Ask a New Question</button>
    {toggleQuestions.map((q)=>{
    return(<><div className = "comm-container-questions" style={{cursor:'pointer'}} onClick={turnReadModeOn} key={q.id}>
     <Link className='container' to={`/community/read/${q.id}`}><h1 className = "Comm-heading">{q.question}</h1>
    <h2 className = "comm-by">Question Posted By:{q.ownerName}</h2>
    <h2 className = "comm-by">Question Posted On:{q.createdOn}</h2></Link>
    <hr className = "comm-line"></hr>
    </div>
    {showMyQuestions?<><button className='btn btn-lg btn-primary'>EDIT</button><button className='btn btn-lg btn-danger' onClick={()=>onDeletePress(q)} >DELETE</button></>:undefined}</>
    )
    })}</div>
)}
}

class ToggleReadEditView extends React.Component{
state={replyMode:false,reply:'',ownerMode:false}

componentDidMount(){
   if(this.props.question.ownerId===this.props.userId){
       this.setState({ownerMode:true});
   }
}

replyModeHandler=()=>{
    this.setState({replyMode:!this.state.replyMode,reply:''});
}
onReplySubmit=()=>{
    let date=new Date();
    const reply={
        ownerId:this.props.userId,
        ownerName:'prachurjya',
        // ownername take from state redux
        createdOn:date.toLocaleDateString(),
        answer:this.state.reply,
        upvotePressed:[],
        downvotePressed:[],
        upvotes:0,
        downvotes:0
    }
    this.props.replySubmitHandler(this.props.question,reply);
    this.replyModeHandler();
}
handleReplyChange=(e)=>{
    this.setState({reply:e.target.value});

}

 render(){   
    let {question,userId,voteHandler,handleDeleteClick,editMode,editFormHandler,editHandler}=this.props;
    

    console.log(question);
    const ReplyForm=(<><form><input type='text/' value={this.state.value} onChange={this.handleReplyChange}></input>
    <button className='btn btn-lg btn-success' onClick={this.onReplySubmit} type='submit'>Reply</button>
    <button className='btn btn-danger btn-lg' onClick={this.replyModeHandler}>Close</button></form></> )
let QuestionView=undefined;

 QuestionView=(<><div className = "jumbotron">
    <h1 >{question.question}</h1>
<h3>Asked By:{question.ownerName}</h3>
<h3>Asked On:{question.createdOn}</h3>
{this.state.ownerMode?<><button className='btn btn-lg btn-primary' onClick={editHandler}>EDIT</button>
<button className='btn btn-danger btn-lg' onClick={(e)=>{e.preventDefault();handleDeleteClick(question)}}>DELETE</button></>:undefined}
    </div>
    <h1>Community Answers:</h1>
    {this.state.replyMode?ReplyForm:undefined}
    {this.state.replyMode?undefined:<button className='btn btn-lg btn-primary'  onClick={this.replyModeHandler}>Reply and help the community grow!!</button>} 
    </>)

let AnswerView=undefined;    
if(question.replies.length!==0){
let replies=question.replies.sort((reply1,reply2)=>{
    return (reply2.upvotes-reply1.upvotes)
})
  AnswerView=(replies.map((reply)=>{
let colorUpButton=reply.upvotePressed.includes(userId)?'btn-warning':'btn-success'; 
let colorDownButton=reply.downvotePressed.includes(userId)?'btn-warning':'btn-danger';        
return(<div className='row' key={reply.id}>
    <ul>
 <li><h3>{reply.answer}</h3></li>
 <li>given by:{reply.ownerName}</li>
 <li>given on:{reply.createdOn}</li>
 <li>upvotes:{reply.upvotes}</li>
 <li>downvotes:{reply.downvotes}</li>
    </ul>
    <button className={`btn btn-lg ${colorUpButton}`} onClick={()=>voteHandler('upvote',question,reply)}>UpVote</button>
    <button className={`btn btn-lg ${colorDownButton}`} onClick={()=>voteHandler('downvote',question,reply)}>DownVote</button>
</div>)
 }))}
 else{
     AnswerView=<h1>No replies Yet :(</h1>
 }
   

return(<div className='container'>{editMode?<h1>hey</h1>:<>{QuestionView} {AnswerView}</>}</div>)   

}
}

class CreateForm extends React.Component{
   state={question:''}

onChangeHandler=(e)=>{
    this.setState({question:e.target.value});
}
handleFormSubmit=(e)=>{
    e.preventDefault();
    let date=new Date();
    const question={
        id:11,
        // id not required after api
        ownerId:this.props.userId,
        ownerName:'prachurjya',
        createdOn:date.toLocaleDateString(),
        question:this.state.question,
        replies:[]
    }
    this.props.questionSubmitHandler(question);
    this.setState({question:''});
    
}
    render(){
        return(<div className='container'>
       <form  onSubmit={this.handleFormSubmit}>
           <label htmlFor="question" style={{display:'block'}}><h1 className = "NoQuestions">ASK YOUR QUESTION HERE!</h1></label>
           <textarea className = "comm-textArea" onChange={this.onChangeHandler} value={this.state.question} name="question"  cols="160" rows="15"></textarea>   
        <button onClick={this.handleFormSubmit} type='submit' className='askComm'> Ask</button>
        <button className='closeComm' onClick={this.props.handleCloseClick}>Close</button>
        </form> 
       </div>)
    }


}


export default CommunityContainer;