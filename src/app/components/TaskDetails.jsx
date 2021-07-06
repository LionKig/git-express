 import React from 'react';
 import uuid from 'uuid';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 
 import { ConnectedUsernameDisplay } from './UsernameDisplay'
 import {
     setTaskCompletion,
     addTaskComment,
     setTaskGroup,
     setTaskName
 } from '../store/mutations'
 
 const TaskDetail = ({
     id,
     comments,
     task,
     isOwner,
     isComplete,
     sessionID,
     groups,
 
     setTaskCompletion,
     addTaskComment,
     setTaskGroup,
     setTaskName
 })=>{
     return (
         <div>
             {isOwner ?
                 <div>
                     <input type="text" value={task.name} onChange={setTaskName}/>
                 </div>
                     :
                 <h3>
                     {task.name} {isComplete ? `✓` : null}
                 </h3>
             }
 
             <div>
                 {isOwner ?
                     <div>
                         <div>
                             You are the owner of this task.
                             <button  onClick={() => setTaskCompletion(id,!isComplete)}>
                                 {isComplete ? `Reopen` : `Complete`} This Task
                             </button>
                         </div>
                     </div>
                     :
                     <div>
                         <ConnectedUsernameDisplay id={task.owner}/> is the owner of this task.
                     </div>}
             </div>
             <div >
                 {comments.map(comment=>(
                     <div key={comment.id}>
                         <ConnectedUsernameDisplay id={comment.owner}/> : {comment.content}
                     </div>
                 ))}
             </div>
 
             <form>
                 <span >
                     Change Group
                 </span>
                 <select onChange={setTaskGroup} className="form-control">
                     {groups.map(group=>(
                         <option key={group.id} value={group.id}>
                             {group.name}
                         </option>
                     ))}
                 </select>
             </form>
 
             <form  onSubmit={(e)=>addTaskComment(id,sessionID,e)}>
                 <input type="text" name="commentContents" autoComplete="off" placeholder="Add a comment"/>
                 <button type="submit" >Submit</button>
             </form>
 
             <div>
             <Link to="/dashboard">
                 <button>
                     Done
                 </button>
             </Link>
             </div>
         </div>
     )
 }
 
 function mapStateToProps(state,ownProps){
     let id = ownProps.match.params.id;
     let task = state.tasks.find(task=>task.id === id);
     let comments = state.comments.filter(comment=>comment.task === id);
     let isOwner = state.session.id === task.owner;
     let groups = state.groups;
 
     return {
         id,
         task,
         comments,
         isOwner,
         sessionID: state.session.id,
         isComplete: task.isComplete,
         groups
     }
 }
 
 function mapDispatchToProps(dispatch, ownProps){
     let id = ownProps.match.params.id;
     return {
         setTaskCompletion(id,isComplete){
             dispatch(setTaskCompletion(id,isComplete));
         },
         setTaskGroup(e){
             dispatch(setTaskGroup(id,e.target.value));
         },
         setTaskName(e){
             dispatch(setTaskName(id,e.target.value));
         },
         addTaskComment(taskID, ownerID, e) {
             let input = e.target[`commentContents`];
             let commentID = uuid();
             let content = input.value;
             e.preventDefault();
             if (content !== ``) {
                 input.value = ``;
                 dispatch(addTaskComment(commentID, taskID, ownerID, content));
             }
         }
     }
 }
 
 export const ConnectedTaskDetail = connect(mapStateToProps,mapDispatchToProps)(TaskDetail);