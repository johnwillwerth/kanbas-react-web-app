import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { BsGripVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { 
  addModule, 
  editModule, 
  updateModule, 
  deleteModule, 
  setModules,
} from "./reducer";

export default function Modules() {

  const { modules } = useSelector((state: any) => state.moduleReducer);
  const { cid } = useParams();
  const dispatch = useDispatch();

  const [moduleName,        setModuleName]        = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleLessons,     setModuleLessons]     = useState([]);
  
  const createModule = async () => {
    const newModule = await coursesClient.createModule(cid || "", {
      name:        moduleName,
      description: moduleDescription,
      lessons:     moduleLessons,
      course:      cid,
    });
    dispatch(addModule(newModule));
    setModuleName(newModule.name);
    setModuleDescription(newModule.description);
    setModuleLessons(newModule.lessons);
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid || "");
    dispatch(setModules(modules));
  };

  const removeModule = async (moduleId: string) => {
    const status = await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  
  useEffect(() => {
    fetchModules();
  }, [cid]);
  
  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={createModule}
      />
      <br />
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              { module.editing && (
                <input 
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(
                      updateModule({ ...module, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch(updateModule({ ...module, editing: false }));
                    }
                  }}
                  value={module.name}
                />
              )}

              <ModuleControlButtons 
                deleteModule={(moduleId) => removeModule(moduleId)}
                moduleId={module._id}
                editModule={() => dispatch(editModule(module._id))} 
              />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )}