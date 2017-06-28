import React from 'react';
import IssueTable from '../issue/IssueTable';
import IssueTableControls from'../issue/IssueTableControls'
import newsAPI from '../../firebase_utils/news'

import {getCurrentUser} from '../../firebase_utils/auth'
import utilityAPI from '../../jsonserver_utils/common'



import * as api from '../../api'

import { Link } from 'react-router';

var Sprint = React.createClass({

    getInitialState() {
        return {
            editNameMode: false,
            editDescriptionMode: false,
            tempName: '',
            tempDescription: '',
            sortBy: '',
            order: true,
            sprint: null,
            issues: []
        };
    },
    componentDidMount: function() {
        this.getAll();
    } ,
    sort : function(s){
        this.setState({
            sortBy: s,
            order: !this.state.order
        })
    },
    search : function(search_term){

        let sid = this.props.params.sprintid;
        if(search_term !== ''){
            api.filterIssues(sid,search_term)
                .then((resp) => {
                console.log(resp);

                            this.setState({
                                issues: resp
                            });

                    }
                );
        }
        else{
            this.getAll();
        }

    },
    getAll : function(){
        let s = this.props.params.sprintid;
            api.loadSprint(s)
                .then((resp)=>{
                console.log(resp);
                    // sprintAPI.listIssues(s).end((error,response)=>{
                        this.setState({
                            sprint: resp,
                            issues: resp.issuesInSprint,
                            tempName: resp.name,
                            tempDescription: resp.description
                        });
                    // })
                });
    },
    addIssue : function(d,p,w,c) {
        console.log("Add issue");
        let assignee = getCurrentUser();
        let s = this.props.params.sprintid;
        api.addIssue(s,d,p,w,assignee)
            .then(response => {
                console.log(response);
                console.log("ADD ISSUE");
                let newsContent = "Created a New Issue ";
                let newsLink = "/issues/" + response.id;
                let newsLinkText = d;
                console.log(newsLink + " " + newsLinkText + " " + assignee + " " + newsContent);
                newsAPI.postNews(assignee,newsContent,newsLink,newsLinkText);
                this.getAll()
            });

    },
    deleteIssue : function(id){
        console.log("Delete issue handler " + id)
        api.deleteIssue(id)
            .then(this.getAll);
    },
    toggleOrder: function(){
        this.setState({
            order: !this.state.order
        })
    },
    handleTempNameChange : function(e){
        e.preventDefault();
        this.setState({tempName: e.target.value});
    },
    handleNameChange : function(){
        let sid = this.props.params.sprintid;
        let new_name = this.state.tempName;
        api.patchName(sid,new_name)
            .then((err,response) => {
                this.getAll();
                this.toggleEditNameMode();
            });
    },
    toggleEditNameMode: function(){
        this.setState({
            tempName : this.state.sprint.name,
            editNameMode : !this.state.editNameMode
        })
    },
    handleTempDescriptionChange : function(e){
        e.preventDefault();
        this.setState({tempDescription: e.target.value});
    },
    handleDescriptionChange : function(){
       let sid = this.props.params.sprintid;
       let desc = this.state.tempDescription;
       api.patchDescription(sid,desc)
            .then((err,response) => {
                this.getAll();
                this.toggleEditDescriptionMode();
            });
    },
    toggleEditDescriptionMode: function(){
        this.setState({
            tempDescription : this.state.sprint.description,
            editDescriptionMode : !this.state.editDescriptionMode
        })
    },
    render: function(){
        return (
            <div className="sprint">
                <div className="row breadcrumbs">
                    <div className="col-md-12">
                        <Link to="/sprints" >Manage</Link> > <strong>{this.state.sprint ? this.state.sprint.name : ""}</strong>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                { this.state.editNameMode ?
                                    <div className="sprint-name col-md-6">
                                        <input type="text"
                                               className="form-control" placeholder="Name of sprint"
                                               value={this.state.tempName}
                                               onChange={this.handleTempNameChange}></input>
                                        <span className="glyphicon glyphicon-ok-circle pull-right pointer" onClick={this.handleNameChange}/>
                                        <span className="glyphicon glyphicon-remove-circle pull-right pointer" onClick={this.toggleEditNameMode}/>
                                    </div>
                                    :
                                    <div className="col-md-12 pointer" ><h3 onClick={this.toggleEditNameMode}>Sprint {this.state.sprint ? this.state.sprint.name : ""}</h3></div>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                { this.state.editDescriptionMode ?
                                    <div className="sprint-name col-md-12">
                            <textarea
                                className="form-control" placeholder="Description of sprint"
                                value={this.state.tempDescription}
                                onChange={this.handleTempDescriptionChange}></textarea>
                                        <span className="glyphicon glyphicon-ok-circle pull-right pointer" onClick={this.handleDescriptionChange}/>
                                        <span className="glyphicon glyphicon-remove-circle pull-right pointer" onClick={this.toggleEditDescriptionMode}/>
                                    </div>
                                    :
                                    <div className="col-md-6 pointer" ><div onClick={this.toggleEditDescriptionMode}>{this.state.sprint ? this.state.sprint.description : ""}</div></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12"><h4>Start Date</h4></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">{this.state.sprint ? utilityAPI.timestampToDateString(this.state.sprint.start_date) : ""}</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12"><h4>End Date</h4></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">{this.state.sprint ? utilityAPI.timestampToDateString(this.state.sprint.end_date) : ""}</div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-12"><h4>Duration</h4></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">{this.state.sprint ? utilityAPI.daysBetween(this.state.sprint.start_date,this.state.sprint.end_date) + " Days" : ""}</div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>


                <div className="row">
                     <div className="col-md-12">
                         <div className="issue-table-controls"><IssueTableControls searchHandler={this.search} /></div>
                     </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="issue-table">
                            <IssueTable issues={this.state.issues}
                                    addHandler={this.addIssue}
                                    deleteHandler={this.deleteIssue}
                                    searchterm={this.state.searchTerm}
                                    sortHandler={this.sort}
                                    sortBy={this.state.sortBy}
                                    order={this.state.order}
                                    toggleOrder={this.toggleOrder}/>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
});

export default Sprint;
