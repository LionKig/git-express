import { Dashboard } from "./Dashboard";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashBoard } from "./Dashboard";
import { Router , Route} from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetail } from "./TaskDetails";
import { Redirect } from "react-router";
import { ConnectedLogin } from "./Login";

const RouteGuard = Component =>({match})=>{
    console.info("Route Guard" , match);
    if( !store.getState().session.authenticated){
        //redirect
        return <Redirect to="/"/> ;
    }else {
        return <Component match={match} /> ;
    }    
}


export const Main = ()=>{
    return (
        <Router history={history}>
            <Provider store={store}>
                <div>
                    <ConnectedNavigation/>
                    <Route exact path="/" component={ConnectedLogin} />
                    <Route exact
                        path="/dashboard"
                        render={RouteGuard(ConnectedDashBoard)}/>

                    <Route exact
                        path="/task/:id"
                        render={RouteGuard(ConnectedTaskDetail)} />
                </div>
            </Provider>
        </Router>
    );
}
