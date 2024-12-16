import model from "./model.js";
export async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
}
export async function getQuizById(quizId) {
    return await model.find({ _id: quizId });
}
export function createQuizzes(quiz) {
    delete quiz._id;
    return model.create(quiz);
}
export function deleteQuizzes(quizId) {
    return model.deleteOne({ _id: quizId });
}
export function getQuizQuestionsById(quizId) {
    return model.findById(quizId, "questions");
}
export async function createQuizQuestions(quizId, question) {
    try {
        const updatedQuiz = await model.findByIdAndUpdate(
            quizId,
            { $push: { questions: question } },
            { new: true, runValidators: true }
        );

        if (!updatedQuiz) {
            throw new Error("Quiz not found");
        }

        return updatedQuiz;
    } catch (error) {
        throw new Error(`Failed to add question: ${error.message}`);
    }
}

export function updateQuizById(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, quizUpdates);
}

export async function updateQuestion(questionId, question) {
    try {
        // Attempt to update the question
        const questionToUpdate = {
            _id: questionId, // Make sure this is unique
            questionText: question.questionText,
            options: question.options,
            correctOptionIndex: question.correctOptionIndex,
            title: question.title,
            points: question.points,
            type: question.type
        };
        const result = await model.findOneAndUpdate(
            { "questions._id": questionId }, 
            { $set: { "questions.$": questionToUpdate } },
            { new: true, runValidators: true }
        );

        if (result) {
            // If the question exists and is updated, return it
            const updatedQuestion = result.questions.find(
                (q) => q._id.toString() === questionId
            );
            return updatedQuestion;
        } else {
            const questionToAdd = {
                _id: questionId, // Make sure this is unique
                questionText: question.questionText,
                options: question.options,
                correctOptionIndex: question.correctOptionIndex,
                title: question.title,
                points: question.points,
                type: question.type
            };
            // If the question does not exist, add it
            const addResult = await model.findOneAndUpdate(
                { _id: question.quizId }, // Find the quiz by quiz ID
                { $push: { questions: questionToAdd } }, // Add the new question
                { new: true, runValidators: true } // Return the updated document and validate changes
            );

            if (!addResult) {
                throw new Error("Failed to create question: Quiz not found.");
            }

            // Return the newly added question
            const newQuestion = addResult.questions.find(
                (q) => q._id.toString() === questionId
            );
            return newQuestion;
        }
    } catch (error) {
        console.error("Error updating or creating question:", error);
        throw new Error("Failed to update or create question.");
    }
}
export function deleteQuestion(quizId, questionId) {
    return model.findByIdAndUpdate(
        quizId,
        { $pull: { questions: { _id: questionId } } },
        { new: true }
    );
}
