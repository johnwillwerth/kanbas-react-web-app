import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {                           // create a state variable that holds
  const [assignment, setAssignment] = useState({                         // default values for the form below.
    id: 1, title: "NodeJS Assignment",                                   // eventually we'll fetch this initial
    description: "Create a NodeJS server with ExpressJS",                // data from the server and populate
    due: "2021-10-10", completed: false, score: 0,                       // the form with the remote data so
  });                                                                    // we can modify it here in the UI  
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  const [module, setModule] = useState({
    id: 1, name: "Module 1: Learning JS",
    description: "An intro to JavaScript",
    course: "Web Development",
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
  
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>                                      {/* encode the title in the URL that */}
      <a id="wd-update-assignment-title"                                 // updates the title
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>                                                               {/* form element to edit local state variable */}
      <input className="form-control w-75" id="wd-assignment-title"      // used to encode in URL that updates  
        value={assignment.title} onChange={(e) =>                 // property in remote object     
          setAssignment({ ...assignment, title: e.target.value })}/><br />  
                   
      <a id="wd-update-assignment-score"                 
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>                                                          
      <input type="number" className="form-control w-75" id="wd-assignment-score"   
        value={assignment.score} onChange={(e) =>                 
          setAssignment({ ...assignment, score: e.target.valueAsNumber })}/><br />

      <a id="wd-update-assignment-completed"                 
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completion Status
      </a>                                                          
      <input type="checkbox" className="form-check-label" id="wd-assignment-completed"   
        checked={assignment.completed} onChange={(e) =>                 
          setAssignment({ ...assignment, completed: e.target.checked })}/> 

      <hr />
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
        <a id="wd-retrieve-assignment-title" className="btn btn-primary"
          href={`${REMOTE_SERVER}/lab5/assignment/title`}>
          Get Title
        </a><hr/>    
      <hr />
      
      <h4>Modifying Modules</h4>                     
      <a id="wd-update-module-name"                 
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Name
      </a>                                                          
      <input className="form-control w-75" id="wd-module-name"   
        value={module.name} onChange={(e) =>                 
          setModule({ ...module, name: e.target.value })}/><br />

      <a id="wd-update-module-description"                 
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Description
      </a>                                                          
      <input className="form-control w-75" id="wd-module-description"   
        value={module.description} onChange={(e) =>                 
          setModule({ ...module, description: e.target.value })}/>

      <hr />
      <h4>Retrieving Modules</h4>
      <a id="wd-retrieve-modules" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr/>
      <h4>Retrieving Module Properties</h4>
        <a id="wd-retrieve-module-name" className="btn btn-primary"
          href={`${REMOTE_SERVER}/lab5/module/name`}>
          Get Module Name
        </a><hr/>
    </div>
  );}