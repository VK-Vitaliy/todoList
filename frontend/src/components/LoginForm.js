import React from "react";
import {BrowserRouter} from "react-router-dom";
import SubmitForm from "./SubmitForm";
import TaskList from "./TaskList";
import Sorting from "./Sorting";
import Pagination from "./Pagination";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({
                [e.target.name]: e.target.value
            }
        );
    }

    handleLogin(e) {
        console.log(this.state.login + ' ' + this.state.password)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleLogin(event)}>
                <input type="text" name="login" placeholder="login"
                       value={this.state.login} onChange={(event) => this.handleChange(event)}/>
                <input type="password" name="password" placeholder="password"
                       value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                <input type="submit" value="Login"/>
            </form>

        )
    }
}

export default LoginForm


