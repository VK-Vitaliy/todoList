import React from "react";

const Pagination = ({handleNextPrevious, next, previous}) => {
    return (
        <div className="row justify-content-center align-items-center mt-3 mb-n3">
            <nav aria-label="Page-navigation">
                <ul className="pagination">

                    <li className="page-item">
                        {previous === null ? (
                            <a className="btn btn-sm btn-link disabled"
                               onClick={handleNextPrevious}
                               name="previous"
                            >Previous</a>
                        ) : (
                            <a className="btn btn-sm btn-link"
                               onClick={handleNextPrevious}
                               name="previous"
                            >Previous</a>
                        )}
                    </li>

                    <li className="page-item">
                        {next === null ? (
                            <a className="btn btn-sm btn-link disabled"
                               onClick={handleNextPrevious}
                               name="next"
                            >Next</a>
                        ) : (
                            <a className="btn btn-sm btn-link"
                               onClick={handleNextPrevious}
                               name="next"
                            >Next</a>
                        )}
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Pagination