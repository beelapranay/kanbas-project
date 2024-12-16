export default function AddAssignmentEditor(
    { dialogTitle, assignmentTitle, setAssignmentTitle, assignmentDescription, setAssignmentDescription, 
        points, setPoints, assignmentDue, setAssignmentDue, assignmentUntil, setAssignmentUntil, addAssignment }:
        {
            dialogTitle: string;
            assignmentTitle: string;
            setAssignmentTitle: (title: string) => void;
            assignmentDescription: string;
            setAssignmentDescription: (assignmentDescription: string) => void;
            points: number,
            setPoints: (points: number) => void;
            assignmentDue: string,
            setAssignmentDue: (assignmentDue: string) => void;
            assignmentUntil: string,
            setAssignmentUntil: (assignmentUntil: string) => void;
            addAssignment: () => void;
        }
) {
    console.log("Entered add assignment editor")
    return (
        <div id="wd-add-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {dialogTitle} </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div id="wd-add-assignments-editor" className="container">
                        <div className="mb-3">
                            <div className="modal-body">
                                <input className="form-control" defaultValue={assignmentTitle} placeholder="Assignment Name"
                                    onChange={(e) => setAssignmentTitle(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <textarea
                                id="wd-description"
                                className="form-control ps-5"
                                style={{ height: '250px' }}
                                placeholder="New Assignment Description"
                                onChange={(e) => setAssignmentDescription(e.target.value)}
                            />
                        </div>

                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="text-end">
                                        <label htmlFor="wd-points" className="form-label">Points</label>
                                    </td>
                                    <td>
                                        <input id="wd-points" className="form-control" value={points}
                                            onChange={(e) => setPoints(Number(e.target.value))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-end">
                                        <label htmlFor="wd-display-grade" className="form-label me-3">Assign</label>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-start">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                                                        <input id="wd-assign-to" className="form-control" value={"Everyone"} readOnly />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="wd-due-date" className="form-label">Due</label>
                                                        <input type="date" id="wd-due-date" className="form-control"
                                                                onChange={(e) => setAssignmentDue(e.target.value)} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="d-flex align-items-center">
                                                            <label htmlFor="" className="me-2">Available From</label>
                                                            <input type="date" className="form-control me-3" 
                                                            onChange={(e) => setAssignmentUntil(e.target.value)} />
                                                            <label htmlFor="" className="me-2">Until</label>
                                                            <input type="date" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Add Assignment </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

