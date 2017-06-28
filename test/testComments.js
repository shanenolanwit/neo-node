
import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";




// UNIT test begin

describe("Issue API unit tests",function(){
    this.timeout(120000);



    // #1 upvote a comment
    it("should upvote a comment",function(done){
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
                                        const comment_id =  res.body.commentsInIssue[0]._id;
                                        superserver
                                            .patch("/api/comments/"+comment_id)
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
                                                        res.body.commentsInIssue[0].upvotes.should.equal(1);
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
    });

});
