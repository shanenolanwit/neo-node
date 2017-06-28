import express from 'express';

import mongoose from 'mongoose'
import Issue from './IssueSchema'
import Comment from '../comments/CommentSchema'
import {bansai_url} from '../../_config';

const router = express.Router();

import ajax from 'superagent'


//Load Issue
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("Issue Router : Load")
    //remember to wrap collections in [] when using populate
    Issue.findById(id).populate(['commentsInIssue']).exec(function(err, entity){
        if(err) { return handleError(res, err); }
        return res.send(entity);
    });
});

//Update Issue
router.patch('/:id', (req, res) => {
    console.log("Issue Router : Update")
    const id = req.params.id;
    Issue.findOneAndUpdate({"_id":id},{$set:req.body}, function(err, result){
        if(err){
            console.log(err);
        }
        res.send(result)
    });
});



//Delete issue
router.delete('/:id', (req, res) => {
    console.log("Issue Router : Delete")
    const id = req.params.id;
    Comment.remove({ issueForComment: id }).exec();
    Issue.findByIdAndRemove(id, function (err, entity) {
        var response = {
            message: "Entity successfully deleted",
        };
        console.log(err);
        res.send(response);
    });
});

//Add comment to issue
router.post('/:id/comments', (req, res) => {
    console.log("Issue Router : Add Comment")
    const id = req.params.id;
    req.body.issueForComment = id;
    Issue.findById(id, function (err, entity) {
        var comment = new Comment(req.body);
        comment.save(function(err) {

            entity.commentsInIssue.push(comment);
            entity.save(function(err) {
                console.log("updated");
            });
            res.send(comment);
        });

    });
});

//Below here for experimental chat bot api.ai

router.get('/count/:name', (req, res) => {
    console.log("Issue Router : Count by name")
    let name = req.params.name.toLowerCase();
    if(name === "all"){
        Issue.count({}, function( err, count){
            console.log( "Number of issues:", count );
            return res.send("There are " + count + " issues");
        })
    } else {
        console.log("Counting issues for " + name);
        Issue.count({"assignee": new RegExp('^'+name+'(@.+)?$', "i")}, function( err, count){
            console.log( "Number of issues:", count );
            return res.send("There are " + count + " issues assigned to " + name);
        })
    }


});

//Load Issue
router.get('/data/charts/pie', (req, res) => {

    let bansaiURL =


    console.log("Issue Router : Get pie data");
    let template = {
        "type":"pie", "title":{"text":"Issue Allocation" },
        "subtitle":{ "text":"by assignee", "font-weight":"normal" },
        "legend":{ "toggle-action":"remove", "x":"75%", "y":"25%" },
        "plotarea":{ "margin-right":"30%", "margin-top":"15%" },
        "plot": {
            "animation": {"on-legend-toggle": true, "effect": 2, "method": 0, "sequence": 1, "speed": 1000},
            "value-box": {"font-size": 11, "font-weight": "normal", "offset-r": "60%"}
        }
    };
    let agg = [
        {$group: {
            _id : "$assignee",

            total: {$sum: 1}
        }}
    ];
    let data = [];
    Issue.aggregate(agg, function(err, logs){
        if (err) {
            console.log(err);
            return res.send([]);
        }
        logs.map(function(obj,index) {
            console.log(obj);
            data.push({"text": obj._id, "values" : [obj.total]});
        });
        console.log(data);
        ajax.get(bansaiURL)
            .then(response => {
                let mapp = {"piedata": data,"chartdata": response.body.performance.settings.index.data}
                return res.send(mapp);
            });


    });




});


export default router;
