import React from "react";

const Pagination = () => {
    return (

            <div className="row justify-content-center align-items-center mt-3 mb-n3">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">

                                    <li className="page-item">
                                        <a className="btn btn-sm btn-outline-secondary"
                                          >Previous</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="btn btn-sm btn-outline-secondary"
                                           >1</a></li>
                                    <li className="page-item">
                                        <a className="btn btn-sm btn-outline-secondary"
                                           >2</a></li>
                                    <li className="page-item">
                                        <a className="btn btn-sm btn-outline-secondary"
                                           >3</a></li>
                                    <li className="page-item">
                                        <a className="btn btn-sm btn-outline-secondary"
                                           >Next</a></li>

                                </ul>
                            </nav>
                        </div>
    )
}

export default Pagination