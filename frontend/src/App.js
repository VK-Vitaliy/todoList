import React from "react";
import './App.css';
import axios from "axios";
import Cookies from 'universal-cookie';

import TaskList from "./components/TaskList";
import SubmitForm from "./components/SubmitForm";
import Pagination from "./components/Pagination";
import Sorting from "./components/Sorting";
import LoginForm from "./components/LoginForm";


const DOMAIN = 'http://127.0.0.1:8000/api/todo/'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            next: null,
            previous: null,
            todoList: [],
            activeItem: {
                id: null,
                title: '',
                user_name: '',
                user_email: '',
                completed: false
            },
            editing: false,
            token: ''
        }
        this.getCookie = this.getCookie.bind(this);
        this.axiosTasks = this.axiosTasks.bind(this);
        this.handleChangedSubmitForm = this.handleChangedSubmitForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.strikeUnstrike = this.strikeUnstrike.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
        this.handleNextPrevious = this.handleNextPrevious.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this)
    };

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.setToken(response.data)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({token: token})
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.setToken('')
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({token: token})
    }

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    getHeaders() {
        var csrftoken = this.getCookie('csrftoken')
        var contentType = 'application/json'
        return {
            'Content-type': contentType,
            'X-CSRFToken': csrftoken,
        }
    }

    axiosTasks() {
        console.log('Connection...')
        axios.get(DOMAIN)
            .then(response => {
                this.setState({todoList: response.data.results})
                this.setState({next: response.data.next})
                this.setState({previous: response.data.previous})
                console.log(this.isAuthenticated())
            }).catch(error => console.log(error))
    }

    handleChangedSubmitForm(e) {
        const name = e.target.name
        const value = e.target.value;
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                [name]: value,
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log('item:', this.state.activeItem)
        var url = DOMAIN
        var method = 'POST'

        if (this.state.editing === true) {
            url = DOMAIN + `${this.state.activeItem.id}/`
            method = 'PUT'
            this.setState({
                editing: false
            })
        }

        axios({
            method: method,
            url: url,
            data: this.state.activeItem,
            headers: this.getHeaders()
        }).then((response) => {
            this.axiosTasks()
            this.setState({
                activeItem: {
                    id: null,
                    title: '',
                    user_name: '',
                    user_email: '',
                    completed: false,
                }
            })
        }).catch(error => console.log(error))

    }

    startEdit(task) {
        this.setState({
            activeItem: task,
            editing: true,
        })
    }

    deleteTask(task) {
        var url = DOMAIN + `${task.id}/`
        axios({
            method: 'DELETE',
            url: url,
            headers: this.getHeaders()
        }).then((response) => {
            this.axiosTasks()
        })
    }

    strikeUnstrike(task) {
        task.completed = !task.completed
        var url = DOMAIN + `${task.id}/`
        axios({
            method: 'PUT',
            url: url,
            data: {'completed': task.completed, 'title': task.title},
            headers: this.getHeaders()
        }).then((response) => {
            this.axiosTasks()
        })
    }

    handleFilter(filterKey) {
        var url = DOMAIN + filterKey

        axios.get(url)
            .then(response => {
                this.setState({next: response.data.next})
                this.setState({previous: response.data.previous})
                this.setState({todoList: response.data.results})
            }).catch(error => console.log(error))
    }

    handleNextPrevious(e) {
        e.preventDefault()
        const value = e.target.name;
        var tempUrl = DOMAIN

        if (value === "next") {
            if (this.state.next != null) {
                tempUrl = this.state.next
            }
        }

        if (value === "previous") {
            if (this.state.previous != null) {
                tempUrl = this.state.previous
            }
        }

        axios.get(tempUrl)
            .then(response => {
                this.setState({next: response.data.next})
                this.setState({previous: response.data.previous})
                this.setState({todoList: response.data.results})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTokenFromStorage()
        this.axiosTasks()
    }

    render() {
        return (
            <div className="container">
                {this.isAuthenticated() ? <button type="button" className="btn btn-outline-light"
                                                  id="loginLogoutButton" onClick={() => this.logout()}>Logout
                </button> : <LoginForm getToken={(username, password) => this.getToken(username, password)}/>}


                <div id="task-container">
                    <SubmitForm handleChangedSubmitForm={this.handleChangedSubmitForm}
                                handleSubmit={this.handleSubmit}
                                value={this.state.activeItem}/>

                    <div id="list-wrapper">
                        <TaskList tasks={this.state.todoList}
                                  startEdit={this.startEdit}
                                  deleteTask={this.deleteTask}
                                  strikeUnstrike={this.strikeUnstrike}/>

                    </div>
                    <Sorting handleFilter={this.handleFilter}/>
                    <Pagination handleNextPrevious={this.handleNextPrevious}
                                next={this.state.next}
                                previous={this.state.previous}/>
                </div>
            </div>
        )
    }
}

export default App;