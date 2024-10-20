import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="d-flex justify-content-end align-items-center gap-2 flex-wrap">
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle me-2"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Publish All</button>
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish all modules and items</a>
          </li>
          <li>
            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish modules only</a>
          </li>
          <li>
            <a id="wd-publish-unpublish-all-modules-and-items" className="dropdown-item" href="#">
              <GreenCheckmark />
              Unpublish all modules and items</a>
          </li>
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
              <GreenCheckmark />
              Unpublish modules only</a>
          </li>
        </ul>
        <button id="wd-view-progress" className="btn btn-lg btn-secondary dropdown-toggle me-2"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          View Progress</button>
        <button id="wd-collapse-all" className="btn btn-lg btn-secondary dropdown-toggle me-2"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Collapse All</button>
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Module</button>
      </div>
    </div>
);}