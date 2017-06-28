import express from 'express';

import mongoose from 'mongoose'
import Comment from './CommentSchema'

const router = express.Router();


//Upvote comment
router.patch('/:id', (req, res) => {


        console.log("Comment Router : Upvote")
        const id = req.params.id;
        console.log(req.body);
        Comment.findByIdAndUpdate(id,{ $inc: { upvotes: 1 } }, function(err, result){
            if(err){
                console.log(err);
            }
            console.log("RESULT: " + result);
            res.send('Done')
        });

});





export default router;
