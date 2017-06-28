import express from 'express';

import sprintRouter from './api/sprints';
import issueRouter from './api/issues';
import commentRouter from './api/comments';
import body_parser from 'body-parser';

import mongoose from 'mongoose'
// import {Mockgoose} from 'mockgoose';
import config from './_config'
import {nodeEnv} from './_config';
import {default_uri} from './_config';
import {test_uri} from './_config';


export const server = express();

let uri = default_uri;
if (nodeEnv == 'test'){
    console.log("ENvironment : Test");
    // var mockgoose = new Mockgoose(mongoose);
    // mockgoose.prepareStorage().then(()=>{
    //     mongoose.connect(default_uri)
    // });
    uri = test_uri
}

mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: '+ err);
    process.exit(-1);
});

let db = mongoose.connect(uri);

//configure body-parser
server.use(body_parser.json());
server.use(body_parser.urlencoded({ extended: false } ));

server.use('/api/sprints', sprintRouter);
server.use('/api/issues', issueRouter);
server.use('/api/comments', commentRouter);
server.use(express.static('build'));

server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});
