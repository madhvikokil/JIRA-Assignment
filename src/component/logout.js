import React,{ Component } from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    
    componentDidMount(){
        localStorage.clear('url');
    }
    
    render() {
        return <Redirect to="/" />
    }
}

export default Logout;