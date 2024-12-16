import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function AdditionCheck(
  { moduleId, deleteModule, editModule }: { moduleId: string; 
    deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void }
) {
  return (
    <span className="me-1">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <FaPlus className="text-dark fw-bold fs-5" />
    </span>
  );
}
