import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControlButtons";
import { IoEllipsisVertical, IoTrashOutline } from "react-icons/io5";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, deleteAssignment, setAssignments } from "./reducer";
import { Modal, Button } from "react-bootstrap";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [points, setPoints] = useState<number>(0);
    const [assignmentDue, setAssignmentDue] = useState("");
    const [assignmentUntil, setAssignmentUntil] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newModule = { 
            title: assignmentTitle, 
            description: assignmentDescription, 
            availableDateTime: assignmentUntil,
            dueDateTime: assignmentDue,
            points: points, 
            course: cid };
        const assignment = await coursesClient.createAssignmentForCourse(cid, newModule);
        dispatch(addAssignment(assignment));
      };

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };

    // Function to confirm deletion of assignment
    const confirmDelete = () => {
        if (selectedAssignmentId) {
            dispatch(deleteAssignment(selectedAssignmentId));
        }
        setShowDeleteModal(false);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedAssignmentId(null);
    };

    return (
        <div id="wd-assignments">
            <ModulesControls
                setAssignmentTitle={setAssignmentTitle}
                assignmentTitle={assignmentTitle}
                assignmentDescription={assignmentDescription}
                setAssignmentDescription={setAssignmentDescription}
                points={points}
                setPoints={setPoints}
                assignmentDue={assignmentDue}
                setAssignmentDue={setAssignmentDue}
                assignmentUntil={assignmentUntil}
                setAssignmentUntil={setAssignmentUntil}
                addAssignment={createAssignmentForCourse}
                
                /> <br />
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        Assignments
                        <div className="float-end">
                            <a style={{
                                border: '1px solid #000',
                                borderRadius: '15px',
                                padding: '2px 10px',
                                marginRight: '10px'
                            }}>
                                40% of Total </a>
                            {/* <AdditionCheck /> */}
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {assignments
                            .filter((assignment: any) => (assignment.course) === cid)  // Filter modules by course
                            .map((assignment: any) => (
                                <li className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <FaPencilAlt className="me-2" />
                                    <div className="flex-grow-1">
                                        <a className="wd-assignment-link" href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                                            {assignment.title}
                                        </a>
                                        <div className="text-start">
                                            <span className="text-danger">{assignment.description}</span> | <b>Not Available until</b> {assignment.until} <br />
                                            Due {assignment.due} | {assignment.points} pts
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end">
                                        <FaTrash
                                            className="text-danger me-3 cursor-pointer"
                                            onClick={() => removeAssignment(assignment._id)}
                                            style={{ fontSize: "1.2rem" }} // Optional size adjustment
                                        />
                                        <LessonControlButtons
                                        />
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}