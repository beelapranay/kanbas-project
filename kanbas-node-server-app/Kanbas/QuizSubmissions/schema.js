import mongoose from "mongoose";

const QuizSubmissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    attempts: [
        {
            answers: [
                {
                    questionId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Question',
                        required: true
                    },
                    answer: {
                        type: String,
                        required: true
                    }
                }
            ],
            submittedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { collection: "quizSubmissions" });

export default QuizSubmissionSchema;
