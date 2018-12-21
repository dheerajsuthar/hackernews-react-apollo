import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from './constants';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {
    render() {
        const token = localStorage.getItem(AUTH_TOKEN);
        console.log(token);

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>LinkShare</Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem componentClass={Link} href="/" to="/">
                        Home
                    </NavItem>
                    {token ? <NavItem componentClass={Link} href="/submit" to="/submit">
                        Submit New Link
                    </NavItem> : <NavItem componentClass={Link} href="/login" to="/login">
                            Login
                        </NavItem>}
                    {token &&
                        <NavItem
                            onClick={() => { localStorage.removeItem(AUTH_TOKEN); this.props.history.push('/') }}
                        >Logout</NavItem>
                    }
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Header);