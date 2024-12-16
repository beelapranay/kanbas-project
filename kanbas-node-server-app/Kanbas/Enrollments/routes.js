import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.delete("/api/users/:userId/enroll", (req, res) => {
    const { moduleId } = req.params;
    enrollmentsDao.enrollUserInCourse(moduleId);
    res.sendStatus(204);
  });
  app.put("/api/users/:userId/unenroll", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    enrollmentsDao.unenrollUserFromCourse(moduleId, moduleUpdates);
    res.sendStatus(204);
  });
}
