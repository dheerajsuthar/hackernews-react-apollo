import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from './constants';

class Header extends Component {
    render() {
        const token = localStorage.getItem(AUTH_TOKEN);
        console.log(token);
        
        return (
            <div>
                <div>LinkShare</div>
                <Link to="/">home</Link>
                <div>|</div>
                {token ? <Link to="/submit">submit</Link> : <Link to="/login">login</Link>}
                {token &&
                    (<div>
                        <div>|</div>
                        <div
                            onClick={() => { localStorage.removeItem(AUTH_TOKEN); this.props.history.push('/') }}
                        >signout</div>
                    </div>
                    )}
            </div>
        );
    }
}

export default withRouter(Header);