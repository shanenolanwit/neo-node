import React, { Component } from 'react';

import CommentList from '../comment/CommentList'
import CommentForm from '../comment/CommentForm'
import IssueDetails from './IssueDetails'
import newsAPI from '../../firebase_utils/news'
import {getCurrentUser} from '../../firebase_utils/auth'
import utilityAPI from '../../jsonserver_utils/common'

import * as api from '../../api'



class Issue extends Component {

    constructor(props){
        super(props);
        this.state = {issue: null, comments: [] };
    }

    componentDidMount() {
        this.load();
    }



    load = () => {
        console.log("IssueJS load")
       let iid = this.props.params.issueid;

        api.loadIssue(iid)
            .then((resp)=>{
                console.log("SET STATE")
                console.log(resp.commentsInIssue);
                this.setState({
                    issue: resp,
                    comments: resp.commentsInIssue
                });

            });


    };

    addComment = (comment,author) => {
            let iid = this.props.params.issueid;
            api.addComment(iid,comment,author)
                .then(response => {
                    console.log(response);
                    this.load();
                });


    }

    incrementUpvote = (id) => {
        console.log("Increment upvote")
        api.upvoteComment(id)
            .then( (res) => {
                this.load()
            })
    }

    updateDetail = (detail) => {
        let iid = this.props.params.issueid;
        console.log("patch detail for issue " + iid + " -> " + detail);

        api.updateDetail(iid,detail)
            .then( (res) => {
                this.load()
            })
    };

    updateDescription = (description) => {
        let iid = this.props.params.issueid;
        console.log("patch description for issue " + iid + " -> " + description);
        api.updateDescription(iid,description)
            .then( (res) => {
                this.load()
            })

    };

    updateAssignee = (assignee) => {
        let iid = this.props.params.issueid;
        console.log("patch assignee for issue " + iid + " -> " + assignee);
        api.updateAssignee(iid,assignee)
            .then( (res) => {
                this.load()
            })

    };

    updatePriority = (issue,inc) => {
        console.log("patch priority for issue " + issue.id);
        api.updatePriority(issue,inc)
            .then( (res) => {
                    console.log("priority patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    updateWorkdays = (issue,inc) => {
        console.log("patch workdays for issue " + issue.id);
            api.updateWorkdays(issue,inc)
            .then( (res) => {
                    console.log("workdays patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    updateStatus = (issue) => {
        var currentStatus = utilityAPI.convertToBoolean(issue.complete);
            api.updateStatus(issue,currentStatus)
            .then( (res) => {
                    let newsLink = "/issues/" + issue._id;
                    let newsLinkText = issue.description;
                    let newsAuthor = getCurrentUser();
                    let newsContent = currentStatus ? "Reopened Issue" : "Completed Issue";
                    console.log(newsLink + " " + newsLinkText + " " + getCurrentUser() + " " + newsContent);
                    newsAPI.postNews(newsAuthor, newsContent, newsLink, newsLinkText);
                    console.log("status patch complete - ready to refresh");
                    this.load()
                }
            );
    }

    render(){

        return (
            <div>
                {this.state.issue
                    ?  <div>
                        <IssueDetails issue={this.state.issue}
                                      updateDetailHandler={this.updateDetail}
                                      updateDescriptionHandler={this.updateDescription}
                                      updateAssigneeHandler={this.updateAssignee}
                                      updatePriorityHandler={this.updatePriority}
                                      updateWorkdaysHandler={this.updateWorkdays}
                                      updateCompleteStatusHandler={this.updateStatus}/>
                        <CommentList comments={this.state.comments} upvoteHandler={this.incrementUpvote} />
                        <CommentForm addCommentHandler={this.addComment} />
                    </div>
                    :   <div>

                        <p>Loading . . .</p>


                    </div>
                }

            </div>
        );
    }
};

export default Issue;