import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPen, FaTrash } from "react-icons/fa";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <FaPen className="me-2"/> 
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
