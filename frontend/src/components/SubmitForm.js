import React from "react";

const SubmitForm = ({handleChangedUserName, handleChangedUserEmail, handleChangedTitle, handleSubmit, value}) => {
    return (
        <div id="form-wrapper">
            <form id="user-form">
                <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                        <input className="form-control" id="user_name"
                               onChange={handleChangedUserName}
                               value={value.user_name}
                               type="text" name="user_name"
                               placeholder="Add your name"/>
                    </div>

                    <div style={{flex: 6}}>
                        <input className="form-control" id="user_email"
                               onChange={handleChangedUserEmail}
                               value={value.user_email}
                               type="text" name="user_email"
                               placeholder="Add your email"/>
                    </div>
                </div>
            </form>

            <form id="task-form">
                <div className="flex-wrapper">

                    <div style={{flex: 8}}>
                        <input className="form-control" id="title"
                               onChange={handleChangedTitle}
                               value={value.title}
                               name="title"
                               type="text" placeholder="Add task"/>
                    </div>

                    <div style={{flex: 0.5}}>
                        <input onClick={handleSubmit} id="submit" className="btn btn-warning" type="submit" value="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SubmitForm