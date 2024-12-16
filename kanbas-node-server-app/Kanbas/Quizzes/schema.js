import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{
        option: { type: String, required: [true, 'Option value is required.'],trim: true},
    }],
    correctOptionIndex: { type: Number, required: true },
    title: { type: String, required: true },
    points: { type: Number },
    type: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: String, required: true },
    points: { type: Number, required: true },
    description: String,
    dueDate: Date,
    availableFromDate: Date,
    availableUntilDate: Date,
    published: { type: Boolean, default: false },
    quizType: {
        type: String,
        enum: ["practiceQuiz", "gradedQuiz"],
        default: "practiceQuiz",
    },
    assignmentGroup: String,
    shuffleAnswers: { type: Boolean, default: false },
    timeLimit: Number,
    multipleAttempts: { type: Boolean, default: false },
    numberOfAttempts: { type: Number, default: 1 },
    viewResponses: {
        type: String,
        enum: ["Always", "AfterGrading", "AfterDueDate"],
        default: "Always",
    },
    showCorrectAnswers: {
        type: String,
        enum: ["immediately", "afterAllAttempts"],
        default: "immediately",
    },
    oneQuestionAtATime: { type: Boolean, default: true },
    requireRespondousLockDownBrowser: { type: Boolean, default: false },
    requiredToViewQuizResults: { type: Boolean, default: false },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: true },
    quizFor: { type: String, default: "Everyone" },
    accessCode: String,
    questions: [questionSchema]
}, { collection: "quizzes" });

export default quizSchema;