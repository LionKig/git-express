import React from 'react' ;
import { connect } from 'react-redux' ;
import * as mutations from '../store/mutations' ;

const LoginComponent = ({authenticateUser})=>{
    return <div>
        <h2> Please Login</h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev"/>
            <input type="password" placeholder="password" name="password" defaultChecked="" />
            <button type="submit">Login</button>
        </form>
        </div>
};

const mapStateToProps = state=>state ;

const mapDispatchToProps = ( dispatch ) => ({
    authenticateUser(e){
        e.preventDefault() ;
        let username = e.target[`username`].value ;
        let password = e.target[`password`].value ;
        dispatch(mutations.requireAuthenticateUser(username , password)) ;
    }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent) ;