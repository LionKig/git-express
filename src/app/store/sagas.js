import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import { history } from './history'
import * as mutations from './mutations';
const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:7777`;

export function* taskCreationSaga(){
    while (true){
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = yield select(state=>state.session.id);
        const taskID = uuid();
        let mutation = mutations.createTask(taskID, groupID, ownerID);
        const { res } = yield axios.post(url + `/task/new`,{task:{
            id:taskID,
            group: groupID,
            owner: ownerID,
            isComplete:false,
            name:"New task"
        }});
        yield put(mutation);
    }
}


export function* taskModificationSaga(){
    while (true){
        const task = yield take([mutations.SET_TASK_GROUP, mutations.SET_TASK_NAME,mutations.SET_TASK_COMPLETE]);
        axios.post(url + `/task/update`,{
            task:{
                id:task.taskID,
                group:task.groupID,
                name:task.name,
                isComplete:task.isComplete
            }});
    }
}

export function* userAuthenticateSaga(){
    while(true){
        const {username,password}=yield take(mutations.REQUIRE_AUTHENTICATE_USER);
        try{
            const {data} = axios.post(url+`/authenticate`,{username,password}) ;
            if( !data ){
                throw new Error() ;
            }
        }catch(e){
            console.log("User-Autiehticate is failed");
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED)) ;
        }
    }
}