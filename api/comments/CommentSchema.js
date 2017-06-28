const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: String,
    comment: String,
    upvotes: { type: Number },
    timestamp: { type: Date, default: Date.now},
    issueForComment: [{ type: Schema.Types.ObjectId, ref: 'issues' }]
});




export default mongoose.model('comments', CommentSchema);