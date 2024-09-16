import { useState } from 'react';
export default function AssignmentEditor() {
    
    // set ability to check or uncheck a checkbox
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checked state
      };

    return (
      <div id="wd-assignments-editor">
        <table>

            <thead>
                <tr>
                    <th align="right"><label htmlFor="wd-name">Assignment Name</label></th>
                    <th><input id="wd-name" defaultValue="A1 - ENV + HTML" /></th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <td align="right"><label htmlFor="wd-description">Description</label></td>
                    <td>
                        <textarea id="wd-description">
                        The assignment is available online Submit a link to the landing page 
                        of your Web application running on Netlify. The landing page should 
                        include the following: Your full name and section, links to each of 
                        the lab assignments, link to the Kanbas application, links to all 
                        relevant source code repositories. The Kanbas application should 
                        include a link to navigate back to the landing page.
                        </textarea>
                    </td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-points">Points</label></td>
                    <td><input id="wd-points" defaultValue={100} /></td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-group">Assignment Group</label></td>
                    <td>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-display-grade-as">Display Grade as</label></td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="ASSIGNMENTS">Percentage</option>
                            <option value="QUIZZES">Letter</option>
                        </select>
                    </td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-submission-type">Submission Type</label></td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="ASSIGNMENTS">Online</option>
                            <option value="QUIZZES">In-person</option>
                        </select>
                    </td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-online-entry-options">Online Entry Options</label></td>
                </tr>

                <tr>
                    <td align="left">
                        <input id="wd-text-entry" type="checkbox" name="Text Entry" 
                        checked={isChecked} onChange={handleCheckboxChange} />
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>

                        <input id="wd-website-url" type="checkbox" name="Website URL"
                        checked={isChecked} onChange={handleCheckboxChange} />
                        <label htmlFor="wd-website-url">Website URL</label><br/>

                        <input id="wd-media-recordings" type="checkbox" name="Media Recordings"
                        checked={isChecked} onChange={handleCheckboxChange} />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                        <input id="wd-student-annotation" type="checkbox" name="Student Annotation"
                        checked={isChecked} onChange={handleCheckboxChange} />
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                        <input id="wd-file-upload" type="checkbox" name="File Uploads"
                        checked={isChecked} onChange={handleCheckboxChange} />
                        <label htmlFor="wd-file-upload">File Uploads</label><br/>
                    </td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-assign-to">Assign to</label></td>
                    <td><input id="wd-assign-to" defaultValue="Everyone" /></td>
                </tr><br/>

                <tr>
                    <td align="right"><label htmlFor="wd-due-date">Due</label></td>
                    <td><input id="wd-due-date" type="date" defaultValue="2024-05-13" /></td>
                </tr><br/>

                <tr>
                    <td align="right" valign="top"><label htmlFor="wd-available-from">Available from</label></td>
                    <td><input id="wd-available-from" type="date" defaultValue="2024-05-06" /></td>
                    <td align="right" valign="top"><label htmlFor="wd-available-until">Until</label></td>
                    <td><input id="wd-available-until" type="date" defaultValue="2024-05-20" /></td>
                </tr>

            </tbody>

            <tfoot>
                <button id="Cancel">Cancel</button> <button id="Save">Save</button>
            </tfoot>

        </table>        
    </div>
);}