import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from './constants';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($name: String!, $email: String!, $password: String!){
        signup(email: $email, password: $password, name: $name){
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
        }
    }
`;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            email: '',
            password: '',
            name: ''
        }
    }

    render() {
        const { login, email, password, name } = this.state;
        return (<div>
            <h4>{login ? 'Login' : 'Signup'}</h4>
            {!login && (
                <input
                    placeholder="Name"
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                ></input>
            )}
            <input
                placeholder="Email"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
            ></input>
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
            ></input>
            <div>
                <Mutation
                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                    variables={{ email, password, name }}
                    onCompleted={data => this._confirm(data)}>
                    {mutation => (
                        <button
                            onClick={mutation}>{login ? 'Login' : 'Signup'}</button>

                    )}

                </Mutation>
                <button onClick={e => this.setState({ login: !login })}>{!login ? 'Already have an account' : 'Create an account'}</button>
            </div>
        </div>);
    }

    _confirm(data) {
        const {token} = this.state.login? data.login: data.signup;
        localStorage.setItem(AUTH_TOKEN, token);
        this.props.history.push('/');
    }
}

export default Login;