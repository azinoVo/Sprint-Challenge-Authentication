import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            credentials: {
                username: "",
                password: ""
            }

        }
    }

    render() {
        return (
            <div className='credential-form'>
                SIGNUP FORM HERE
                <form onSubmit={this.register} autoComplete="off">
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        placeholder="...username"
                        onChange={this.onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        placeholder="...password"
                        onChange={this.onChange}
                    />

                    <button>Register</button>
                </form>
            </div>
        );
    }


    onChange = event => {
        console.log(this.state.credentials);

        this.setState({
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })
    }

    register = event => {
        event.preventDefault();
        const credentials = {
            username: this.state.credentials.username,
            password: this.state.credentials.password
        }

        axios
            .post('http://localhost:3300/api/register', credentials)
            .then(res => {
                console.log(res);

                this.props.history.push('/login')

            })
            .catch(err => {
                console.log(err);

            })
    }
}

export default Signup;