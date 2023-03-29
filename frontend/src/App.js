import React from "react";
import './App.css';
import axios from "axios";


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
        this.axiosTasks = this.axiosTasks.bind(this);
    };

    componentDidMount() {
        this.axiosTasks()
    }

    axiosTasks() {
        console.log('Connection...')

        axios.get(DOMAIN)
            .then(response => {
                this.setState({todoList: response.data})
            }).catch(error => console.log(error))

    }

    render() {
        return (
            <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                        <form id="form">
                            <div className="flex-wrapper">
                                <div style={{flex: 6}}>
                                    <input className="form-control" id="title" type="text" placeholder="Add task"/>
                                </div>

                                <div style={{flex: 1}}>
                                    <input id="submit" className="btn btn-warning" type="submit" value="Submit"/>
                                </div>

                            </div>

                        </form>

                    </div>

                    <div id="list-wrapper">

                    </div>

                </div>
            </div>
        )
    }
}

export default App;