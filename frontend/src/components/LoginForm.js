import React from "react";

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
        console.log("LOGIN:", this.state.login + ' ' + "PASSWORD:", this.state.password)
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-outline-light"
                        id="loginLogoutButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Login
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Login Form</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="inputUserName">Username</label>
                                        <input className="form-control" name="login"
                                               value={this.state.login}
                                               onChange={(e) => this.handleChange(e)}
                                               placeholder="Login Username" type="text"
                                               id="inputUserName"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <input className="form-control" name="password"
                                               value={this.state.password}
                                               onChange={(e) => this.handleChange(e)}
                                               placeholder="Login Password" type="password"
                                               id="inputPassword"/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={(e) => this.handleLogin(e)} type="submit"
                                        className="btn btn-secondary">Login
                                </button>
                                <button id="btnHideModal" type="button" className="btn btn-secondary"
                                       data-bs-dismiss="modal" aria-label="Close">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default LoginForm


