import Issue from "../issues/IssueSchema"
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SprintSchema = new Schema({
    name: { type: String, unique: true},
    description: String,
    start_date: { type: Date, default: Date.now},
    end_date: { type: Date, default: Date.now},
    issuesInSprint: [{ type: Schema.Types.ObjectId, ref: 'issues' }]
});

SprintSchema.pre('remove', function(next) {
    Issue.remove({sprintForIssue: this._id}).exec();
    next();
});




export default mongoose.model('sprints', SprintSchema);