import React from "react";

const Sorting = ({handleFilter}) => {
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                Sorting by
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onClick={() => handleFilter("?ordering=user_name")}
                       className="dropdown-item">User
                    name</a></li>
                <li><a onClick={() => handleFilter("?ordering=user_email")}
                       className="dropdown-item">User
                    email</a></li>
                <li><a onClick={() => handleFilter("?ordering=completed")}
                       className="dropdown-item">Completed</a></li>
            </ul>
        </div>

    )
}

export default Sorting