import { useState } from 'react';

export default function AssignmentEditor() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checked state
    };

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <h2>Edit Assignment</h2>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control mb-3" defaultValue="A1"/>
                </div>
            </div>

            <div className="form-label">
                <label htmlFor="wd-description" className="form-label"/>
                <div className="border p-3 rounded"> {/* Border around the description */}
                    <p>
                        The assignment is <span style={{ color: 'red' }}>available online</span>.
                    </p>
                    <p>Submit a link to the landing page of your Web application running on Netlify.</p>

                    <p>The landing page should include the following:</p>
                    <ul>
                        <li>Your full name and section</li>
                        <li>Links to each of the lab assignments</li>
                        <li>Link to the Kanbas application</li>
                        <li>Links to all relevant source code repositories</li>
                    </ul>

                    <p>
                        The Kanbas application should include a link to navigate back to the landing page.
                    </p>
                </div>
            </div>

            <div className="form-label">
                <div className="row">
                    <div className="col-auto"> {/* Adjust the width of the label */}
                        <label htmlFor="wd-points" className="form-label">
                            <span>Points</span>
                        </label>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <input id="wd-points" className="form-control"defaultValue={100}/>
                    </div>
                </div>
            </div>

            <div className="form-label">
                <div className="row">
                    <div className="col-auto"> {/* Adjust the width of the label */}
                        <label htmlFor="wd-group" className="form-label">
                            <span>Assignment Group</span>
                        </label>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <select id="wd-group" className="form-control">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-label">
                <div className="row">
                    <div className="col-auto"> {/* Adjust the width of the label */}
                        <label htmlFor="wd-display-grade-as" className="form-label">
                            <span>Display Grade as</span>
                        </label>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <select id="wd-display-grade-as" className="form-control">
                            <option value="ASSIGNMENTS">Percentage</option>
                            <option value="QUIZZES">Letter</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-label">
                <div className="row">
                    <div className="col-auto"> {/* Adjust the width of the label */}
                        <label htmlFor="wd-submission-type" className="form-label">
                            <span>Submission Type</span>
                        </label>
                    </div>
                    <div className="col">
                        <div className="border p-3 rounded">
                            <div className="col-12 col-md-6 mb-3">
                                <select id="wd-submission-type" className="form-control">
                                    <option value="ASSIGNMENTS">Online</option>
                                    <option value="QUIZZES">In-person</option>
                                </select>
                            </div>
                            <label htmlFor="wd-online-entry-options" className="form-label">
                                <span style={{ fontWeight: 'bold', float: 'left' }}>Online Entry Options</span>
                            </label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="wd-text-entry" />
                                <label className="form-check-label" htmlFor="wd-text-entry">
                                    Text Entry
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="wd-website-url" />
                                <label className="form-check-label" htmlFor="wd-website-url">
                                    Website URL
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="wd-media-recordings" />
                                <label className="form-check-label" htmlFor="wd-media-recordings">
                                    Media Recordings
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="wd-student-annotation" />
                                <label className="form-check-label" htmlFor="wd-student-annotation">
                                    Student Annotation
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="wd-file-uploads" />
                                <label className="form-check-label" htmlFor="wd-file-uploads">
                                    File Uploads
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-label">
                <div className="row">
                    <div className="col-auto"> {/* Adjust the width of the label */}
                        <label htmlFor="wd-assign-to" className="form-label">
                            <span>Assign</span>
                        </label>
                    </div>
                    <div className="col">
                        <div className="border p-3 rounded">
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="wd-assign-to" className="form-label">
                                    <span style={{ fontWeight: 'bold' }}>Assign to</span>
                                </label>
                                <input id="wd-assign-to" className="form-control" defaultValue="Everyone"/>

                                <label htmlFor="wd-due-date" className="form-label">
                                    <span style={{ fontWeight: 'bold' }}>Due</span>
                                </label>
                                <input id="wd-due-date" type="date" className="form-control" defaultValue="2024-05-13"/>

                                <label htmlFor="wd-available-from" className="form-label">
                                    <span style={{ fontWeight: 'bold' }}>Available from</span>
                                </label>
                                <input id="wd-available-from" type="date" className="form-control" defaultValue="2024-05-06"/>

                                <label htmlFor="wd-available-until" className="form-label">
                                    <span style={{ fontWeight: 'bold' }}>Until</span>
                                </label>
                                <input id="wd-available-until" type="date" className="form-control" defaultValue="2024-05-20"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-end mt-3">
                    <button id="Cancel" className="btn btn-secondary me-2">Cancel</button>
                    <button id="Save" className="btn btn-danger">Save</button>
                </div>
            </div>
        </div>
    );
}
