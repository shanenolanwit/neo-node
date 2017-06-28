import React, { Component } from 'react';
import { Link } from 'react-router';
import utilityAPI from '../../jsonserver_utils/common'

class IssueDetails extends Component {

    constructor(props){
        super(props);
        let tdtl = this.props.issue.detail ? this.props.issue.detail : "";
        let tdsc = this.props.issue.description ? this.props.issue.description : "";
        let tasgn = this.props.issue.assignee ? this.props.issue.assignee : "";
        this.state = {
            editDetailMode: false,
            editDescriptionMode: false,
            editAssigneeMode: false,
            tempDetail: tdtl,
            tempDescription: tdsc,
            tempAssignee: tasgn
        }
    }

    toggleEditDetailMode = (e) => {
        this.setState({
            tempDetail : this.props.issue.detail,
            editDetailMode : !this.state.editDetailMode
        })
    };

    toggleEditDescriptionMode = (e) => {
        this.setState({
            tempDescription : this.props.issue.description,
            editDescriptionMode : !this.state.editDescriptionMode
        })
    };

    toggleEditAssigneeMode = (e) => {
        this.setState({
            tempAssignee : this.props.issue.assignee,
            editAssigneeMode : !this.state.editAssigneeMode
        })
    };

    handleTempDetailChange = (e) => {
        e.preventDefault();
        this.setState({tempDetail: e.target.value});
    };

    handleDetailChange = (e) => {
        e.preventDefault();
        this.props.updateDetailHandler(
            this.state.tempDetail
        );
        this.toggleEditDetailMode()
    };

    handleTempDescriptionChange = (e) => {
        e.preventDefault();
        this.setState({tempDescription: e.target.value});
    };

    handleDescriptionChange = (e) => {
        e.preventDefault();
        this.props.updateDescriptionHandler(
            this.state.tempDescription
        );
        this.toggleEditDescriptionMode()
    };

    handleTempAssigneeChange = (e) => {
        e.preventDefault();
        this.setState({tempAssignee: e.target.value});
    };

    handleAssigneeChange = (e) => {
        e.preventDefault();
        this.props.updateAssigneeHandler(
            this.state.tempAssignee
        );
        this.toggleEditAssigneeMode()
    };


    increasePriority = (e) => {
        e.preventDefault();
        this.props.updatePriorityHandler(
            this.props.issue, true
        )
    };

    decreasePriority = (e) => {
        e.preventDefault();
        this.props.updatePriorityHandler(
            this.props.issue, false
        )
    };

    increaseWorkdays = (e) => {
        e.preventDefault();
        this.props.updateWorkdaysHandler(
            this.props.issue, true
        )
    };

    decreaseWorkdays = (e) => {
        e.preventDefault();
        this.props.updateWorkdaysHandler(
            this.props.issue, false
        )
    };

    toggleStatus = (e) => {
        e.preventDefault();
        this.props.updateCompleteStatusHandler(
            this.props.issue
        )
    }

    render() {
        console.log("/src/components/issue/IssueDetails : render");
        let completionStyle = "col-md-4 kpi-complete " + ( utilityAPI.convertToBoolean(this.props.issue.complete) ? "complete" : "incomplete" );
        let priorityStyle = "col-md-4 kpi-priority " + ( this.props.issue.priority.toLowerCase()  );
        let workdaysStyle = "col-md-4 kpi-workdays " + ( this.props.issue.workdays < 4 ? "low" : this.props.issue.workdays > 6 ? "high" : "medium" );
        let sprintOverviewLink = "/sprints/" + this.props.issue.sprintForIssue[0];
        return (
            <div className="issue">
                <div className="row breadcrumbs">
                    <div className="col-md-12">
                        <Link to="/sprints" >Manage</Link> > <Link to={sprintOverviewLink} >Sprint Overview</Link>
                        > <strong>{this.props.issue.description}</strong>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        {
                            this.state.editDescriptionMode ?
                                <div>
                                    <input type="text"
                                           className="form-control" placeholder="Name or description of issue"
                                           value={this.state.tempDescription}
                                           onChange={this.handleTempDescriptionChange}></input>

                                    <span className="glyphicon glyphicon-ok-circle pull-right" onClick={this.handleDescriptionChange}/>
                                    <span className="glyphicon glyphicon-remove-circle pull-right" onClick={this.toggleEditDescriptionMode}/>
                                </div>
                                :
                                <div className="issue-description">
                                    <div className="issue-header pointer" onClick={this.toggleEditDescriptionMode}>{this.props.issue.description}</div>
                                </div>
                        }
                    </div>

                </div>
                <div className="row issue-body">

                        {
                            this.state.editDetailMode ?
                                <div className="col-md-4 col-md-offset-2 issue-detail">
                                    <textarea className="form-control" onChange={this.handleTempDetailChange} value={this.state.tempDetail} />
                                    <span className="glyphicon glyphicon-ok-circle pull-right" onClick={this.handleDetailChange}/>
                                    <span className="glyphicon glyphicon-remove-circle pull-right" onClick={this.toggleEditDetailMode}/>
                                </div>
                                :
                                <div className="col-md-4 col-md-offset-2 issue-detail">
                                    <div className="form-control pointer" onClick={this.toggleEditDetailMode}>{this.props.issue.detail}</div>

                                </div>
                        }


                    <div className="col-md-4 kpi-indicators">
                        <div className="row equal">
                            <div className={workdaysStyle}>
                                <div className="row"><div className="col-md-12 kpi-header">Workdays</div></div>
                                <div className="row"><div className="col-md-12 pointer" onClick={this.increaseWorkdays}><span className="glyphicon glyphicon-menu-up"> </span></div></div>
                                <div className="row"><div className="col-md-12">{this.props.issue.workdays}</div></div>
                                <div className="row"><div className="col-md-12 pointer" onClick={this.decreaseWorkdays}><span className="glyphicon glyphicon-menu-down"> </span></div></div>
                            </div>
                            <div className={priorityStyle}>
                                <div className="row"><div className="col-md-12 kpi-header">Priority</div></div>
                                <div className="row"><div className="col-md-12 pointer" onClick={this.increasePriority}><span className="glyphicon glyphicon-menu-up"> </span></div></div>
                                <div className="row"><div className="col-md-12">{this.props.issue.priority}</div></div>
                                <div className="row"><div className="col-md-12 pointer" onClick={this.decreasePriority}><span className="glyphicon glyphicon-menu-down"> </span></div></div>
                            </div>
                            <div className={completionStyle}>
                                <div className="row"><div className="col-md-12 kpi-header">Status</div></div>
                                <div className="row"><div className="col-md-12 pointer" onClick={this.toggleStatus}><span className="glyphicon glyphicon-menu-up"> </span></div></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        {utilityAPI.convertToBoolean(this.props.issue.complete) ?  <span className="complete">Complete</span> : <span className="incomplete">Not Complete</span>}
                                    </div>
                                </div>
                                <div className="row"><div className="col-md-12 pointer" onClick={this.toggleStatus}><span className="glyphicon glyphicon-menu-down"> </span></div></div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-2"></div>
                </div>
                <div className="row">
                    {
                        this.state.editAssigneeMode ?
                            <div className="col-md-4 col-md-offset-2 issue-assignee">
                                <input type="text"
                                       className="form-control" placeholder="Assignee"
                                       value={this.state.tempAssignee}
                                       onChange={this.handleTempAssigneeChange}></input>

                                <span className="glyphicon glyphicon-ok-circle pull-right" onClick={this.handleAssigneeChange}/>
                                <span className="glyphicon glyphicon-remove-circle pull-right" onClick={this.toggleEditAssigneeMode}/>
                            </div>
                            :
                            <div className="col-md-4 col-md-offset-2 issue-assignee">
                                <div className="form-control pointer" onClick={this.toggleEditAssigneeMode}>Assigned to {this.props.issue.assignee}</div>

                            </div>
                    }
                </div>
             </div>
    );
}

}

export default IssueDetails;

