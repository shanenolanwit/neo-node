import React, { Component } from 'react';
import {line as LineChart} from 'zingchart-react';
var ZingChart = require('zingchart-react').core;
import loading from '../../../public/images/loading.gif'
import * as api from '../../api'
import ChatWindow from './ChatWindow'

class FakeDashboard extends Component {
    constructor(){
        super()
        this.state = {
            pieChartSeries: [],
            simulationMode: false,
            intervalId: 0,
            lineChartData : [],
            barChartData : [{ values: [50,20,33,45,70,70,75,80,90,55,44,21,10,30,41,54,70,71,75,83,88,92,62,90]}],
            areaChartData : [ { text : "Application 1", values : [25,75,50,25,100] },
                { text : "Application 2", values : [33,55,77,44,60] },
                { text : "Application 3", values : [70,12,47,80,59] },
                { text : "Application 4", values : [82,80,43,49,33] },],
            pieChartData:
                {
                    "type":"pie",
                    "title":{
                        "text":"Issue Allocation"
                    },
                    "subtitle":{
                        "text":"by assignee",
                        "font-weight":"normal"
                    },
                    "legend":{
                        "toggle-action":"remove", //to enable toggling animation
                        "x":"75%",
                        "y":"25%"
                    },
                    "plotarea":{
                        "margin-right":"30%",
                        "margin-top":"15%"
                    },
                    "plot":{
                        "animation":{
                            "on-legend-toggle": true, //to enable toggling animation
                            "effect": 2, //the animation effect
                            "method": 0, //how the animation behaves
                            "sequence": 1, //the order of the animation
                            "speed": 1000 //the animation speed, in milliseconds
                        },
                        "value-box":{
                            "font-size":11,
                            "font-weight":"normal",
                            "offset-r":"60%"
                        }
                    },
                    "series": []
                }


        }
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        console.log("Loading some real data")

        api.loadPieData()
            .then((resp)=>{
            let piedata = resp.piedata;

                let template = {
                    "type":"pie", "title":{"text":"Issue Allocation" },
                    "subtitle":{ "text":"by assignee", "font-weight":"normal" },
                    "legend":{ "toggle-action":"remove", "x":"75%", "y":"25%" },
                    "plotarea":{ "margin-right":"30%", "margin-top":"15%" },
                    "plot": {
                        "animation": {"on-legend-toggle": true, "effect": 2, "method": 0, "sequence": 1, "speed": 1000},
                        "value-box": {"font-size": 11, "font-weight": "normal"}
                    },
                    "series": piedata
                };

                console.log(template);
                let lcd = resp.chartdata.map(function(entry,index){
                    return {"text": entry.name, "values": entry.issues }
                });
                console.log(lcd);
                this.setState({
                    pieChartData : template,
                    lineChartData : lcd
                });

            });


    };

    changeData = () => {
        this.setState({
            lineChartData : this.simulateLineData(),
            barChartData : this.simulateBarData(),
            areaChartData : this.simulateAreaData()
        });
    };

    simulateAreaData(){
        var data = [
            { text : "Application 1", values : [] },
            { text : "Application 2", values : [] },
            { text : "Application 3", values : [] },
            { text : "Application 4", values : [] }
        ];

        for(var i = 0; i < data.length; i++){
            for(var j = 0; j < 7; j++){
                data[i].values.push( Math.floor(Math.random() * 20));
            }

        }

        return data;
    }

    simulateBarData(){

        var data = [];
        for(var i = 0; i < 24; i++){
            data.push( Math.floor(Math.random() * 25));
        }
        return  [{ values : data }] ;
    }

     simulateLineData(){
         var data = [
             { text : "Development", values : [] },
             { text : "QA", values : [] },
             { text : "Production", values : [] }
         ];

        for(var j=0; j < 3; j++){
            var series = data[j].values;
            for(var i = 0; i < 10; i++){
                series.push( Math.floor(Math.random() * 100));
            }

        }
        return data;
    }

    toggleSimulationMode = () => {
        var refreshIntervalId = 0;


        clearInterval(this.state.intervalId);
        if(!this.state.simulationMode){
            refreshIntervalId = setInterval(this.changeData, 3000);
        }
        this.setState({
            simulationMode: !this.state.simulationMode,
            intervalId: refreshIntervalId
        })
    }

    render() {
        return (
            <div>
            <div className="row">
                <div className="col-md-5">
                    {this.state.lineChartData.length > 0 ?
                        <div className="row">
                            <b>Issues closed over the last 7 days</b><br/>
                            <i>powered by elastic search</i>
                            <div className="col-md-12">
                                <LineChart id="chart1" legend="true" series={this.state.lineChartData} title="" height="300" width="400" />
                            </div>
                        </div>

                    :
                        <span> <img src={loading} className="loading" alt="Loading" /></span>
                    }
                </div>
                <div className="col-md-5">
                    {this.state.barChartData.length > 0 ?
                        <ZingChart id="chart2" data={this.state.pieChartData} height="300"  width="100%"/>
                        :
                        <span> <img src={loading} className="loading" alt="Loading" /></span>
                    }
                </div>
                <div className="col-md-2">
                    {this.state.barChartData.length > 0 ?

                        <ChatWindow />
                        :
                        <span> <img src={loading} className="loading" alt="Loading" /></span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button onClick={this.toggleSimulationMode}>{this.state.simulationMode ? "Disable Simulation" : "Enable Simulation"}</button>
                </div>
            </div>
            </div>
        );
    }
}

export default FakeDashboard;
