import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {gav} from '../actions/index'



class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <button onClick={()=>this.props.gav('LOOOL')}>Go</button>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({gav},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(App);
