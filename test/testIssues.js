
import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";




// UNIT test begin

describe("Issue API unit tests",function(){
    this.timeout(120000);

    // #1 load issue and all comments
    it("should load a single issue",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration');
                const id = res.body.entity._id;
                superserver
                    .post("/api/sprints/"+id + "/issues")
                    .send({description:"SprintAPI",detail:"Add sprint api tests",assignee:"shane",priority:"HIGH"})
                    .expect("Content-type",/json/)
                    .expect(200)
                    .end(function(err,res){
                        res.body.should.have.property('_id');
                        res.body.sprintForIssue[0].should.equal(id);
                        const issue_id = res.body._id;
                        superserver
                            .get("/api/issues/"+issue_id)
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                                res.body.should.have.property('_id');
                                res.body.sprintForIssue[0].should.equal(id);
                                res.body.commentsInIssue.length.should.equal(0);
                                superserver
                                    .delete("/api/sprints/"+id)
                                    .expect("Content-type",/json/)
                                    .expect(200)
                                    .end(function(err,res){
                                        res.body.id.should.equal(id);
                                        res.body.should.have.property("message");
                                        res.body.message.should.equal('Entity successfully deleted');
                                        done();
                                    });
                            });
                    });

            });
    });

    // #2 modify an issue
    it("should modify an issue",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration');
                const id = res.body.entity._id;
                superserver
                    .post("/api/sprints/"+id + "/issues")
                    .send({description:"SprintAPI",detail:"Add sprint api tests",assignee:"shane",priority:"HIGH"})
                    .expect("Content-type",/json/)
                    .expect(200)
                    .end(function(err,res){
                        res.body.should.have.property('_id');
                        res.body.sprintForIssue[0].should.equal(id);
                        const issue_id = res.body._id;
                        superserver
                            .patch("/api/issues/"+issue_id)
                            .send({description:"Add testing",detail:"Use mocha to test your sprints"})
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                                superserver
                                    .get("/api/issues/"+issue_id)
                                    .expect("Content-type",/json/)
                                    .expect(200)
                                    .end(function(err,res){
                                        res.body.should.have.property('_id');
                                        res.body.detail.should.equal("Use mocha to test your sprints");
                                        res.body.description.should.equal("Add testing");
                                        res.body.sprintForIssue[0].should.equal(id);
                                        res.body.commentsInIssue.length.should.equal(0);
                                        superserver
                                            .delete("/api/sprints/"+id)
                                            .expect("Content-type",/json/)
                                            .expect(200)
                                            .end(function(err,res){
                                                res.body.id.should.equal(id);
                                                res.body.should.have.property("message");
                                                res.body.message.should.equal('Entity successfully deleted');
                                                done();
                                            });
                                    });
                            });

                    });

            });
    });

    // #3 delete an issue
    it("should load a single issue",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration');
                const id = res.body.entity._id;
                superserver
                    .post("/api/sprints/"+id + "/issues")
                    .send({description:"SprintAPI",detail:"Add sprint api tests",assignee:"shane",priority:"HIGH"})
                    .expect("Content-type",/json/)
                    .expect(200)
                    .end(function(err,res){
                        res.body.should.have.property('_id');
                        res.body.sprintForIssue[0].should.equal(id);
                        const issue_id = res.body._id;
                        superserver
                            .get("/api/issues/"+issue_id)
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                                res.body.should.have.property('_id');
                                res.body.sprintForIssue[0].should.equal(id);
                                res.body.commentsInIssue.length.should.equal(0);

                                    superserver
                                        .delete("/api/issues/"+issue_id)
                                        .expect("Content-type",/json/)
                                        .expect(200)
                                        .end(function(err,res){
                                            superserver
                                                .get("/api/sprints/"+id)
                                                .expect("Content-type",/json/)
                                                .expect(200)
                                                .end(function(err,res){
                                                    res.body.issuesInSprint.length.should.equal(0);
                                                    superserver
                                                        .delete("/api/sprints/"+id)
                                                        .expect("Content-type",/json/)
                                                        .expect(200)
                                                        .end(function(err,res){
                                                            res.body.id.should.equal(id);
                                                            res.body.should.have.property("message");
                                                            res.body.message.should.equal('Entity successfully deleted');
                                                            done();
                                                        });
                                                });
                                        });

                            });
                    });

            });
    });


    // #4 add a comment to an issue
    it("should add comments to an issue",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration');
                const id = res.body.entity._id;
                superserver
                    .post("/api/sprints/"+id + "/issues")
                    .send({description:"SprintAPI",detail:"Add sprint api tests",assignee:"shane",priority:"HIGH"})
                    .expect("Content-type",/json/)
                    .expect(200)
                    .end(function(err,res){
                        res.body.should.have.property('_id');
                        res.body.sprintForIssue[0].should.equal(id);
                        const issue_id = res.body._id;
                        superserver
                            .post("/api/issues/"+issue_id + "/comments")
                            .send({author:"BruceWayne",comment:"I am batman"})
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                                superserver
                                    .get("/api/issues/"+issue_id)
                                    .expect("Content-type",/json/)
                                    .expect(200)
                                    .end(function(err,res){
                                        res.body.commentsInIssue.length.should.equal(1);
                                        res.body.commentsInIssue[0].author.should.equal("BruceWayne");
                                        superserver
                                            .delete("/api/sprints/"+id)
                                            .expect("Content-type",/json/)
                                            .expect(200)
                                            .end(function(err,res){
                                                res.body.id.should.equal(id);
                                                res.body.should.have.property("message");
                                                res.body.message.should.equal('Entity successfully deleted');
                                                done();
                                            });
                                    });
                            });

                    });

            });
    });

});
