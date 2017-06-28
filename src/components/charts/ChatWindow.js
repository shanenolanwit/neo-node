import React, { Component } from 'react';
import {getCurrentUser} from '../../firebase_utils/auth'
import Button from '../common/Button'
import ajax from "superagent"

import * as api from '../../api'

import {api_ai_query_url} from '../../../_config';
import {api_ai_auth_code} from '../../../_config';

class ChatWindow extends Component {

    constructor(){
        super();
        var user = getCurrentUser();
        this.state = {question: "", answer:"", author: user};
    }

    handleQuestionChange = (e) => {
        this.setState({question: e.target.value});
    };

    askQuestion = () => {
        let question = api_ai_query_url + this.state.question;
        console.log(question);
        let that = this;
        ajax.get(question)
            .set({ 'Authorization':  api_ai_auth_code })

            .end(function(err,res){
                let action = res.body.result.action;

                if(action === "count_issues_by_name"){
                    console.log("count issues assigned to " + res.body.result.parameters["given-name"]);
                    api.count_issues_by_name(res.body.result.parameters["given-name"])
                        .then((resp)=>{
                            that.setState({
                                answer: resp,question: "",author: getCurrentUser()

                            });

                        });
                } else if(action === "count_issues"){
                    console.log("count issues");
                    api.count_issues_by_name("all")
                        .then((resp)=>{
                            that.setState({
                                answer: resp,question: "",author: getCurrentUser()

                            });

                        });
                }
                else{
                    console.log(action);
                }

            });


    }

    render() {

        return (
            <div className="row">
                <div className="col-md-12">
                    <div>{
                        this.state.answer
                    }</div>
                    <input type="text"
                           className="form-control author-input pull-right" placeholder="question"
                           value={this.state.question}
                           onChange={this.handleQuestionChange}>
                    </input>
                    <Button title="Ask Question" stylingRules="pull-right" handleSubmit={this.askQuestion} />

                </div>

            </div>


        );
    }

}

export default ChatWindow;
