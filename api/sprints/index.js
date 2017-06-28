import express from 'express';

import mongoose from 'mongoose'
import Sprint from './SprintSchema'
import Issue from '../issues/IssueSchema'

const router = express.Router();

//Load Sprint
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("Sprint Router : Load")
    //remember to wrap collections in [] when using populate
    Sprint.findById(id).populate(['issuesInSprint']).exec(function(err, entity){
        if(err) { return res.status(404).send("No sprint found with that id") }
        return res.send(entity);
    });
});

//List Sprints
router.get('/', (req, res) => {
    console.log("Sprint Router : Get All")
    Sprint.find((err, sprints) => {
        console.log("find finished");
        if(err) { return handleError(res, err); }
        return res.send(sprints);
    });


});

//Create sprint
router.post('/', (req,res) => {
    console.log("Sprint Router : Create")
    const newEntity = req.body;
    console.log(newEntity);
    let result = null;
    if (newEntity){
        Sprint.create(newEntity, (err, entity) => {
            if(err) { return handleError(res, err); }
            return res.status(201).send({entity});
        });
    }else{
        return   res.status(400).send({message: "Unable to find Post in request. No Post Found in body"});
    }
});

//Delete sprint
router.delete('/:id', (req, res) => {
    console.log("Sprint Router : Delete")
    const id = req.params.id;
    Sprint.findById(id).populate(['issuesInSprint']).exec(function(err, entity){
        if(err){
            console.log(err);
        } else{

                entity.issuesInSprint.forEach((item,index)=> {
                    item.remove();
                });
                Sprint.findByIdAndRemove(id, function (err, entity) {
                    entity.remove()
                    var response = {
                        message: "Entity successfully deleted",
                        id: entity._id
                    };
                    res.send(response);
                });


        }

    });

});

router.patch('/:id', (req, res) => {
    console.log("Sprint Router : Update")
    const id = req.params.id;
    Sprint.findOneAndUpdate(id,{$set:req.body}, function(err, result){
        if(err){
            console.log(err);
        }
        res.send(result)
    });
});



//Add issue to sprint
router.post('/:id/issues', (req, res) => {
    console.log("Sprint Router : Add Issue")
    const id = req.params.id;
    req.body.sprintForIssue = id;
    Sprint.findById(id, function (err, entity) {
        var issue = new Issue(req.body);
        issue.save(function(err) {

            entity.issuesInSprint.push(issue);
            entity.save(function(err) {
                console.log("updated");
            });

            res.send(issue);
        });

    });
});

//Filter Issues
router.get('/:id/issues/q/:filter', (req, res) => {
    console.log("Sprint Router : Filter Issues")
    const id = req.params.id;
    const filter = req.params.filter;
    console.log(id + ":" + filter);
    Issue.find({ "description": { "$regex": filter, "$options": "i" } },(err, issues) => {
        if(err) { console.log(err)}
        else{
            console.log("NO ERR" + issues);
        }
        return res.send(issues);
    });
});




export default router;
