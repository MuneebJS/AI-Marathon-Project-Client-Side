
import React, { PureComponent } from 'react';
import Selection from './Selection';
import Profile from './Profile';
// import {observer, propTypes} from 'mobx-react';
import _ from 'lodash';


class App extends PureComponent {
    constructor()    {
        super();
        this.state = {
            status: true,
            check: 'test'
        }
    }
    changeStatus() {
        this.setState({
            status: !this.state.status,
            
        })
    }
    renderStatusTrue() {
        if(!this.state.status) null;
        return (
            <div>{`status is true now ${this.state.check}`}</div>
        )
    }
    renderStatusFalse() {
        if(this.state.status) return null;
        return (
            <div>status is false now</div>
        )
    }
    render() {
        return(
            <div>
                <h2>Status</h2>
               { this.renderStatusTrue()}
                {this.renderStatusFalse()} 
                <button onClick={this.changeStatus.bind(this)}>
                    Change
                 </button>
                 <div>
                
                 </div>
            </div>

        )
    }
    
}

export default App;

