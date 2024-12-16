import * as quizSubmissionDao from "./dao.js";
export default function QuizSubmissionRoutes(app) {

    app.post("/api/quizzes/:quizId/submitQuiz", async (req, res) => {
        try {
            const { studentId, attempts } = req.body; // Expect 'attempts' array
            const { quizId } = req.params;

            if (!studentId || !quizId || !attempts || !Array.isArray(attempts) || !attempts[0].answers) {
                return res.status(400).send("Invalid submission data.");
            }

            // Push the new attempt (first element in 'attempts') into the database
            await quizSubmissionDao.storeQuizSubmission(studentId, quizId, attempts[0].answers);

            res.status(200).send("Success");
        } catch (error) {
            console.error("Error handling quiz submission:", error);
            res.status(500).send("Internal server error.");
        }
    });


    app.get("/api/quizzes/:quizId/submission", async (req, res) => {
        const { quizId } = req.params;
        const data = await quizSubmissionDao.getSubmissionData(quizId);
        res.json(data);
    });
}