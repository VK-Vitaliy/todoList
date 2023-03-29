import React from "react";


const TaskList = ({tasks}) => {
    return (
        tasks.map((task, index) =>
            <div key={index} className="task-wrapper flex-wrapper">
                <div style={{flex: 10}}>
                    <span>{task.title}</span>
                </div>

                <div style={{flex: 1}}>
                    <button className="btn btn-sm btn-outline-dark">Edit</button>
                </div>

                <div style={{flex: 1}}>
                    <button className="btn btn-sm btn-outline-dark delete">Del</button>
                </div>
            </div>)
    )
}


export default TaskList