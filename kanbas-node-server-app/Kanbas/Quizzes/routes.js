import * as quizDao from "./dao.js";
export default function QuizzesRoutes(app) {
  app.delete("/api/quizzes/:quizId", async(req, res) => {
    const { quizId } = req.params;
    await quizDao.deleteQuizzes(quizId);
    res.sendStatus(204);
  });
  app.get("/api/quizzes/:quizId/questions", async(req, res) => {
    const { quizId } = req.params;
    const quiz = await quizDao.getQuizQuestionsById(quizId);
        
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz.questions);
  });
  app.get("/api/quizzes/:quizId", async(req, res) => {
    const { quizId } = req.params;
    const quiz = await quizDao.getQuizById(quizId);
    res.json(quiz);
  });

  app.put("/api/quizzes/:quizId", async(req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const quiz = await quizDao.updateQuizById(quizId, quizUpdates);
    res.json(quiz);
  });

  app.post("/api/quizzes/:quizId/questions", async(req, res) => {
    const { quizId } = req.params;
    const question = req.body;

    try {
        const updatedQuiz = await quizDao.createQuizQuestions(quizId, question);
        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/quizzes/:quizId/updateAllQuestions", async(req, res) => {
    const { quizId } = req.params;
    const questions = req.body;

    try {
        const updatedQuiz = await quizDao.createQuizQuestions(quizId, question);
        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/quizzes/questions/:questionId", async(req, res) => {
    const { questionId } = req.params;
    const question = req.body;

    try {
        const updateQuestion = await quizDao.updateQuestion(questionId, question);
        res.status(200).json(updateQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", async(req,res) => {
    const { quizId, questionId } = req.params;
    await quizDao.deleteQuestion(quizId, questionId);
    res.sendStatus(204);
  });
}

