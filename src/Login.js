import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from './constants';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
        return (<form>
            {!login && (
                <FormGroup>
                    <ControlLabel>{login ? 'Login' : 'Signup'}</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                </FormGroup>)}
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => this.setState({ email: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                />
            </FormGroup>
            <div>
                <Mutation
                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                    variables={{ email, password, name }}
                    onCompleted={data => this._confirm(data)}>
                    {mutation => (
                        <Button
                            onClick={mutation}>{login ? 'Login' : 'Signup'}</Button>

                    )}

                </Mutation>
                <Button onClick={e => this.setState({ login: !login })}>{!login ? 'Already have an account' : 'Create an account'}</Button>
            </div>
        </form>);
    }

    _confirm(data) {
        const { token } = this.state.login ? data.login : data.signup;
        localStorage.setItem(AUTH_TOKEN, token);
        this.props.history.push('/');
    }
}

export default Login;