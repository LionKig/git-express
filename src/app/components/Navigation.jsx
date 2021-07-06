import React from "react" ;
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = ()=>(
    <div>
        <Link to="/Dashboard">
            <h1>My Application</h1>
        </Link>
    </div>
) ;

const mapStateToProps=(state)=>{
    return state ;
}

export const ConnectedNavigation = connect(mapStateToProps)(Navigation) ;