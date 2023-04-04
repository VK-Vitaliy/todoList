import React from "react";
import './App.css';
import axios from "axios";

import TaskList from "./components/TaskList";
import SubmitForm from "./components/SubmitForm";


const DOMAIN = 'http://127.0.0.1:8000/api/todo/'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todoList: [],
            activeItem: {
                id: null,
                title: '',
                user_name: '',
                user_email: '',
                completed: false
            },
            editing: false,
        }
        this.getCookie = this.getCookie.bind(this);
        this.axiosTasks = this.axiosTasks.bind(this);
        this.handleChangedUserName = this.handleChangedUserName.bind(this)
        this.handleChangedUserEmail = this.handleChangedUserEmail.bind(this)
        this.handleChangedTitle = this.handleChangedTitle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

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

    componentDidMount() {
        this.axiosTasks()
    }

    axiosTasks() {
        console.log('Connection...')

        axios.get(DOMAIN)
            .then(response => {
                this.setState({todoList: response.data})
                console.log(this.state.todoList)
            }).catch(error => console.log(error))

    }

    handleChangedUserName(e) {
        const value = e.target.value;
        console.log('value:', value)
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                user_name: value,
            }
        })
    }

    handleChangedUserEmail(e) {
        const value = e.target.value;
        console.log('value:', value)
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                user_email: value,
            }
        })
    }

    handleChangedTitle(e) {
        const value = e.target.value;
        console.log('value:', value)
        this.setState({
            activeItem: {
                ...this.state.activeItem,
                title: value,
            }
        })
    }


    handleSubmit(e) {
        e.preventDefault()
        console.log('item:', this.state.activeItem)
        var csrftoken = this.getCookie('csrftoken')
        var url = DOMAIN
        var method = 'POST'

        axios({
            method: method,
            url: url,
            data: this.state.activeItem,
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
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


    render() {
        return (
            <div className="container">
                <div id="task-container">
                    <SubmitForm handleChangedUserName={this.handleChangedUserName}
                                handleChangedUserEmail={this.handleChangedUserEmail}
                                handleChangedTitle={this.handleChangedTitle}
                                handleSubmit={this.handleSubmit}
                                value={this.state.activeItem}/>

                    <div id="list-wrapper">
                        <TaskList tasks={this.state.todoList}/>

                    </div>

                </div>
            </div>
        )
    }
}

export default App;