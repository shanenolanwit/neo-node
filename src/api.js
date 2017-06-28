import axios from 'axios';



export const getAll = () => {
    return axios('/api/posts')
        .then(resp => resp.data);
};

export const getPost = postId => {
    return axios.get(`/api/posts/${postId}`)
        .then(resp => resp.data);
};


//START HERE

export const getSprints = () => {
    console.log("Axios getSprints");
    return axios('/api/sprints')
        .then(resp => resp.data);
};

export const loadSprint = sprintId => {
    console.log("Axios loadSprint");
    return axios.get('/api/sprints/' + sprintId)
        .then(resp => resp.data);
};



export const createSprint = (n,d,sd,ed) => {
    console.log("Axios createSprint")
    return axios.post('/api/sprints', { name: n, description: d, start_date: sd, end_date: ed })
        .then(resp => resp.data);
};

export const deleteSprint = sprintId => {
    console.log("Axios deleteSprint")
    return axios.delete('/api/sprints/' + sprintId)
        .then(resp => resp.data);
};

export const patchName = (iid,name) => {
    console.log("Axios patchName")
    return axios.patch('/api/sprints/' + iid,  { name: name })
        .then(resp => resp.data);
};

export const patchDescription = (iid,description) => {
    console.log("Axios patchDescription")
    return axios.patch('/api/sprints/' + iid,  {description: description})
        .then(resp => resp.data);
};


export const addIssue = (sprintId,description,priority,workdays,assignee) => {
    console.log("Axios addIssue")
    return axios.post('/api/sprints/' + sprintId + '/issues',
        { detail: "[no additional detail provided]", description: description, priority: priority, workdays: workdays, assignee: assignee})
        .then(resp => resp.data);
};

export const deleteIssue = (iid) => {
    console.log("Axios deleteIssue ")
    return axios.delete('/api/issues/' + iid )
        .then(resp => resp.data);
};

export const filterIssues = (sid,search_term) => {
    console.log("Axios filterIssues")
    return axios.get('/api/sprints/' + sid + '/issues/q/' + search_term)
        .then(resp => resp.data);
};

export const loadIssue = issueId => {
    console.log("Axios loadIssue")
    return axios.get('/api/issues/' + issueId)
        .then(resp => resp.data);
};

export const addComment = (issueId,comment,author) => {
    console.log("Axios addComment")
    return axios.post('/api/issues/' + issueId + '/comments',
        { comment: comment, author: author, upvotes: 0 })
        .then(resp => resp.data);
};

export const upvoteComment = (commentId) => {
    console.log("Axios upvoteComment")
    return axios.patch('/api/comments/' + commentId)
        .then(resp => resp.data);
};



export const updateDetail = (iid,detail) => {
    console.log("Axios updateDetails")
    return axios.patch('/api/issues/' + iid,  {detail: detail})
        .then(resp => resp.data);
};

export const updateDescription = (iid,description) => {
    console.log("Axios updateDescription");
    return axios.patch('/api/issues/' + iid,  {description: description})
        .then(resp => resp.data);
};

export const updateAssignee = (iid,assignee) => {
    console.log("Axios updateAssignee");
    return axios.patch('/api/issues/' + iid,  {assignee: assignee})
        .then(resp => resp.data);
};

export const updatePriority = (issue,inc) => {
    console.log("Axios updatePriority");
    let newPriority = issue.priority;
    if(issue.priority === "Low"){
        newPriority = ( inc ) ? "Medium" : "Low"
    } else if(issue.priority === "Medium"){
        newPriority = ( inc ) ? "High" : "Low"
    } else if(issue.priority === "High"){
        newPriority = ( inc ) ? "High" : "Medium"
    } else {
        console.log("Unrecognised priority")
    }
    return axios.patch('/api/issues/' + issue._id,  {priority: newPriority})
        .then(resp => resp.data);
};

export const updateWorkdays = (issue,inc) => {
    console.log("Axios updateWorkdays");
    var orig = parseInt(issue.workdays,10);
    var newWorkdays = inc ?
        orig < 11 ? orig +1 : orig
        : orig > 1 ? orig -1 : orig;
    return axios.patch('/api/issues/' + issue._id,  {"workdays": newWorkdays})
        .then(resp => resp.data);
};

export const updateStatus = (issue,currentStatus) => {
    console.log("Axios updateStatus");
    return axios.patch('/api/issues/' + issue._id,  {"complete": !currentStatus})
        .then(resp => resp.data);
};

// Experimental - used by chat bot

export const count_issues_by_name = (assignee) => {
    console.log("Axios count_issue_by_name");
    return axios.get('/api/issues/count/' + assignee)
        .then(resp => resp.data);
};


//Experimental - used by fake dash
export const loadPieData = () => {
    console.log("Axios load pie data");
    return axios.get('/api/issues/data/charts/pie')
        .then(resp => resp.data);
};

