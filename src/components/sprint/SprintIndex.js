import React from 'react';
import SprintTable from './SprintTable'
import * as api from '../../api'


var SprintIndex = React.createClass({
    getInitialState() {
        return {
            sprintList: []
        };
    },
    componentDidMount: function() {
        this.getAll();
    },
    getAll : function(){
        console.log("SprintIndex getAll")
        api.getSprints()
            .then(response => {
                this.setState({
                    sprintList: response
                });
            });
    },
    addSprint : function(n,d,sd,ed) {
      api.createSprint(n,d,sd,ed)
            .then((response)=> {
                this.getAll();
      });
    },
    deleteSprint : function(id) {
        api.deleteSprint(id).then( this.getAll() )

    },
    render: function(){

        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <SprintTable sprints={this.state.sprintList} addHandler={this.addSprint} deleteHandler={this.deleteSprint}/>
                </div>
            </div>
        );
    }
});

export default SprintIndex;