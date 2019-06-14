import React, { Component } from 'react';
import axios from 'axios';
import '../config/axiosConfig';


class Jokes extends Component {
    constructor() {
        super();
        this.state = {
            jokes: []
        }   
    }

    componentDidMount() {

        axios
        .get('http://localhost:3300/api/jokes')
        .then(res => {
            console.log(res)

            this.setState({
                jokes: res.data
            })
    
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
                Jokes List
                {localStorage.getItem('token') ? this.state.jokes.map(joke => {
                    return <div key={joke.id}><li>{joke.joke}</li></div>
                }) : <div>Please login to view jokes.</div>}

                {localStorage.getItem('token') && <button onClick={this.logout}>Logout</button>}


            </div>
        );
    }

    logout = event => {
        event.preventDefault();
        localStorage.removeItem('token');

        this.props.history.push('/login')
    }
}

export default Jokes;