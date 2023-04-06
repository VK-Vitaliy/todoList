import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        };
    }
    handleChanged(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}


