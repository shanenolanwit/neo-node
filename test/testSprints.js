import supertest from "supertest";
import {server} from  "./../server.js";
import should from "should";




// UNIT test begin

describe("Sprint API unit tests",function(){
    this.timeout(120000);

    // #1 empty list should be ok
    it("should load sprints",function(done){
        supertest(server)
            .get("/api/sprints")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    // #2 load sprint and all issues
    it("should load a single sprint",function(done){
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
                        superserver
                            .get("/api/sprints/"+id)
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){

                                res.body.issuesInSprint.length.should.equal(1);
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

    // #3 add a sprint and then remove it
    it("should add a sprint",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration');
                const id = res.body.entity._id;
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

    // #4 add, update a sprint and then remove it
    it("should update a sprint",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration');
                const id = res.body.entity._id;
                superserver
                    .patch("/api/sprints/"+id)
                    .send({name:"Integration UPDATE"})
                    .expect("Content-type",/json/)
                    .expect(200)
                    .end(function(err,res){
                        res.body._id.should.equal(id);
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

    // #5 add two sprints, list sprints, change sprint, list sprints, delete sprints
    it("should delete a sprint",function(done){
        const superserver = supertest(server);
        superserver
            .post('/api/sprints')
            .send({name:"Integration A",description:"Sprint for testings"})
            .expect("Content-type",/json/)
            .expect(201)
            .end(function(err,res){
                res.status.should.equal(201);
                res.body.entity.should.have.property('_id');
                res.body.entity.name.should.equal('Integration A');
                const idA = res.body.entity._id;
                superserver
                    .post('/api/sprints')
                    .send({name:"Integration B",description:"Sprint for testings"})
                    .expect("Content-type",/json/)
                    .expect(201)
                    .end(function(err,res){
                        res.status.should.equal(201);
                        res.body.entity.should.have.property('_id');
                        res.body.entity.name.should.equal('Integration B');
                        const idB = res.body.entity._id;
                        superserver
                            .get("/api/sprints")
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                                res.status.should.equal(200);
                                res.body.length.should.equal(2);
                                superserver
                                    .delete("/api/sprints/"+idA)
                                    .expect("Content-type",/json/)
                                    .expect(200)
                                    .end(function(err,res){
                                        res.body.id.should.equal(idA);
                                        res.body.should.have.property("message");
                                        res.body.message.should.equal('Entity successfully deleted');
                                        superserver
                                            .delete("/api/sprints/"+idB)
                                            .expect("Content-type",/json/)
                                            .expect(200)
                                            .end(function(err,res){
                                                res.body.id.should.equal(idB);
                                                res.body.should.have.property("message");
                                                res.body.message.should.equal('Entity successfully deleted');
                                                superserver
                                                    .get("/api/sprints")
                                                    .expect("Content-type",/json/)
                                                    .expect(200)
                                                    .end(function(err,res) {
                                                        res.status.should.equal(200);
                                                        res.body.length.should.equal(0);
                                                        done();
                                                    });
                                            });
                                    });
                            });

                    });

            });
    });

    // #6 add an issue to a sprint
    it("should add issues to a sprint",function(done){
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

    // #7 filter issues in a sprint
    it("should filter issues within a sprint",function(done){
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
                        res.body.sprintForIssue[0].should.equal(id);
                        superserver
                            .post("/api/sprints/"+id + "/issues")
                            .send({description:"IssueAPI",detail:"Add issue api tests",assignee:"shane",priority:"HIGH"})
                            .expect("Content-type",/json/)
                            .expect(200)
                            .end(function(err,res){
                                res.body.sprintForIssue[0].should.equal(id);
                                superserver
                                    .post("/api/sprints/"+id + "/issues")
                                    .send({description:"Tomcat",detail:"install tomcat",assignee:"shane",priority:"MEDIUM"})
                                    .expect("Content-type",/json/)
                                    .expect(200)
                                    .end(function(err,res){
                                        res.body.sprintForIssue[0].should.equal(id);
                                        superserver
                                            .get("/api/sprints/"+id + "/issues/q/tomcat")
                                            .expect("Content-type",/json/)
                                            .expect(200)
                                            .end(function(err,res){
                                                res.body.length.should.equal(1);
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



    //ERROR CHECKING
    // #2 load sprint and all issues
    it("should load a single sprint",function(done){
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
                        let fakeId = id + "fake123";
                        superserver
                            .get("/api/sprints/"+ fakeId)
                            .expect("Content-type",/json/)
                            .expect(404)
                            .end(function(err,res){

                                res.text.toLowerCase().should.equal("no sprint found with that id");
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
