import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ProtectedContent from "../../Account/ProtectedContent";

export default function ModuleControlButtons(
{ moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void }) {

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      deleteModule(moduleId);
    }
  };

  return (
    <div className="float-end">
      <ProtectedContent>
        <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
        <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete}/>
      </ProtectedContent>
      <GreenCheckmark />
      <ProtectedContent>
        <BsPlus className="fs-4" />
      </ProtectedContent>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}