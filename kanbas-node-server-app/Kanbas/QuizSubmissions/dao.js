import model from "./model.js";

export async function storeQuizSubmission(studentId, quizId, answers) {
    try {
        // Add a new attempt (answers array) to the 'attempts' array
        await model.findOneAndUpdate(
            { studentId, quizId }, // Locate the submission for this student and quiz
            { $push: { attempts: { answers } } }, // Push a new attempt object into the attempts array
            { upsert: true, new: true } // Create a new submission if it doesn't exist
        );

        console.log("New attempt stored successfully.");
    } catch (error) {
        console.error("Error storing quiz submission:", error);
        throw error;
    }
}

export async function getSubmissionData(quizId) {
    return await model.find({ quizId: quizId });
}