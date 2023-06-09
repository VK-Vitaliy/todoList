import React from "react";

const TaskList = ({tasks, startEdit, deleteTask, strikeUnstrike}) => {
    return (
        tasks.map((task, index) =>
            <div key={index} className="task-wrapper flex-wrapper">
                <div onClick={() => strikeUnstrike(task)} style={{flex: 10}}>
                    {task.completed === false ? (
                        <span>{task.title}</span>
                    ) : (
                        <strike>{task.title}</strike>
                    )}

                    <div className="user-info-wrapper">
                        <span>{"added by "}{task.user_name + ";"} {"email: "}{task.user_email}</span>
                    </div>
                </div>

                <div style={{flex: 1}}>
                    <button onClick={() => startEdit(task)} className="btn btn-sm btn-outline-dark">Edit</button>
                </div>

                <div style={{flex: 1}}>
                    <button onClick={() => deleteTask(task)} className="btn btn-sm btn-outline-dark delete">Del</button>
                </div>
            </div>)
    )
}


export default TaskList