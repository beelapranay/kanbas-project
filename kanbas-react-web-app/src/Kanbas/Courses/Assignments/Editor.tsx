import { useLocation, useParams } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find((assignment) => assignment._id === aid);
    return (
        <div id="wd-assignments-editor" className="container">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input value={assignment?.title} className="form-control mb-2" />
            </div>
            <div className="mb-3">
                <textarea
                    id="wd-description"
                    className="form-control ps-5"
                    style={{ height: '250px' }}
                    placeholder="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify..."
                />
            </div>
            <table className="table table-borderless">
                <tbody>
                    <tr>
                        <td className="text-end">
                            <label htmlFor="wd-points" className="form-label">Points</label>
                        </td>
                        <td>
                            <input id="wd-points" className="form-control" value={100} />
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end">
                            <label htmlFor="wd-assignments" className="form-label">Online Entry Options</label>
                        </td>
                        <td>
                            <select id="wd-select-one-group" className="form-select">
                                <option value="COMEDY">Text Entry</option>
                                <option value="DRAMA">Website URL</option>
                                <option selected value="SCIFI">Media Recordings</option>
                                <option value="FANTASY">Student Annotations</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end">
                            <label htmlFor="wd-display-grade" className="form-label">Display Grade As</label>
                        </td>
                        <td>
                            <select id="wd-select-display-grade" className="form-select">
                                <option value="COMEDY">Text Entry</option>
                                <option value="DRAMA">Website URL</option>
                                <option selected value="SCIFI">Media Recordings</option>
                                <option value="FANTASY">Student Annotations</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end">
                            <label htmlFor="wd-submission-type" className="form-label me-3">Submission Type</label>
                        </td>
                        <td>
                            <div className="d-flex align-items-start">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <select id="wd-select-submission-type" className="form-select mb-3">
                                            <option value="COMEDY">Text Entry</option>
                                            <option value="DRAMA">Website URL</option>
                                            <option selected value="SCIFI">Media Recordings</option>
                                            <option value="FANTASY">Student Annotations</option>
                                        </select>
                                        <div>
                                            <label className="form-label">Online Entry Options</label><br />
                                            <div>
                                                <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
                                                <label htmlFor="wd-chkbox-comedy" className="ms-1">Text Entry</label><br />

                                                <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
                                                <label htmlFor="wd-chkbox-drama" className="ms-1">Website URL</label><br />

                                                <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
                                                <label htmlFor="wd-chkbox-scifi" className="ms-1">Media Recordings</label><br />

                                                <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
                                                <label htmlFor="wd-chkbox-fantasy" className="ms-1">Student Annotations</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            <input type="date" id="wd-due-date" className="form-control" value="2000-01-21" />
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <label htmlFor="" className="me-2">Available From</label>
                                                <input type="date" className="form-control me-3" />
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
            <hr />
            <div className="text-end mt-3">
                <button id="wd-add-assignment-group" className="btn btn-secondary">Cancel</button>
                <button id="wd-add-assignment" className="btn btn-danger">Save</button>
            </div>
        </div>
    );
}
