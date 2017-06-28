import Comment from "../comments/CommentSchema"
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const IssueSchema = new Schema({
    description: String,
    detail: String,
    priority: String,
    assignee: String,
    workdays: { type: Number, default: 1, min: 0, max: 5},
    complete: { type: Boolean, default: false },
    sprintForIssue: [{ type: Schema.Types.ObjectId, ref: 'sprints' }],
    commentsInIssue: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

IssueSchema.pre('remove', function(next) {
    Comment.remove({issueForComment: this._id}).exec();
    next();
});



export default mongoose.model('issues', IssueSchema);