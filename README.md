# Assignment 2 - NodeJS application.

Name: Shane Nolan (20012561)

## Overview.
Neo is an app used to assist agile teams manage 
sprint cycles. A sprint is composed of a collection of issues, 
each given an estimate of how long it will take to complete (
from 1 to 10 days), a priority ranked from low to high, and 
a status - complete or not complete. Each issue should be assigned 
to a single developer, have a 
simple descriptive name, with the ability to add more detail. 
Developers should be able to leave comments on issues to 
promote collaboration. Other developers should be able to vote 
up these comments if they find them helpful. 
The main objective while developing this application was to 
provide core features necessary to complete an agile development 
cycle without adding too much clutter.

Given the assignment specifications I attempted to implement a 
wide variety of features to demonstrate understanding and 
independent learning. 



 . . . . . List of user features . . . . 
 
 + User registration / Authentication
 + Realtime Dashboard / Newsfeeds
 + Basic chat app
 + Simple and clean UI design
 + Form Validation
 + Create / Read / Update / Delete Sprints
 + Create / Read / Update / Delete Issues
 + Comment Upvoting on issues
 + Search and sort issues
 + Breadcrumbs for quick navigation

## Installation requirements.
... Dependencies ...
+ axios 0.15.3
+ babel-cli 6.23.0
+ babel-preset-es2015 6.22.0
+ babel-preset-stage-2 6.22.0
+ body-parser 1.17.1
+ bootstrap 3.3.6
+ compression 1.6.2
+ express 4.15.2
+ firebase 3.6.10
+ lodash 4.17.4
+ mongoose 4.9.5
+ react 15.4.2
+ react-dom 15.4.2
+ react-router 2.6.1
+ superagent 3.5.0
+ zingchart 2.1.2
+ zingchart-react 1.0.5

... Dev Dependencies ...
+ babel-core 6.24.1
+ babel-watch 2.0.6
+ concurrently 3.4.0
+ cross-env 4.0.0
+ mocha 3.3.0
+ mochawesome 2.1.0
+ react-scripts 0.9.4
+ should 11.2.1
+ supertest 3.0.0

... Third Party Dependencies ...
+ Firebase Account (Authentication and Websocket Comms)
+ MongoLab/mLab Account (Hosted Mongo Datastore for Sprint details)
+ Bansai.io Account (Hosted ElasticSearch cluster used to store sample chart data)
+ API.ai Account (Hosted AI Service used for Simple ChatBot)
+ SauceLabs Account (Hosted Automated UAT/Regression Testing)
+ TravisCI.org account (Hosted Continuous Integration System)
+ BlueMix Account (Deployment)

... Software Used For Development ...
+ Windows 10 OS (Developed on Windows / Deployed on Linux)
+ Sublime text & PhpStorm IDE (Used for writing / Structuring code) 
+ Notepad++ (Regular Expression support makes bulk editing rediculously easy)
+ Postman (Used to manually test REST endpoints)



After cloning the application
Sign up for and replace all the tokens required for the 
third party services listed above. Then run the following commands:

npm install

npm start

The application should start up and open in the default browser


## Routing
Uses react routing, express routing and axios to handle requests and responses

## REACT Routing.
+ / - displays home screen Home
+ /home - displays home screen Home
+ /news - display news screen NewList
+ /login - displays the login/register.js screen Login
+ /sprints - displays the list of sprints SprintIndex
+ /sprints/:id - displays a particular sprint Sprint
+ /issues/:id - displays a particular issue Issue

## EXPRESS Routing.
+ GET /api/sprints - get all sprints
+ GET /api/sprints/:id - get the sprint with the given id
+ POST /api/sprints - create a new sprint using the given params
+ DELETE /api/sprints/:id - delete the sprint with the given id
+ PATCH /api/sprints/:id - update the sprint with the given id
+ POST /api/sprints/:id/issues - create a new issue and add it to sprint with the given id
+ DELETE /api/issues/:id - delete the issues with the given id
+ GET /api/sprints/:id/issues/q/:term - find issues with a given sprint whose description matches a given search term
+ GET /api/issues/:id - find the issue with the given id
+ PATCH /api/issues/:id - update the issue with the given id
+ POST /api/issues/:id/comments - create a new comment and add it to the issue with the given id
+ PATCH /api/comments/:id - upvote the comment with a given id
+ GET /api/issues/count/:assignee - count issues assigned to a given assignee
+ GET /api/issues/data/charts/pie - collect issue assignment details for the new page pie chart

## Extra features and independent learning

+ Authentication and Registration -> Uses firebase to authenticate users
+ Dashboard Charts -> Uses Zing to display real data
+ Dashboard News -> Uses firebases websocket service to display real time user events
+ Dashboard TechNews -> Displays tech news from techradars site
+ Validation and Easy Editing -> State for client side validation, mongoose for server side
+ Testing - Used mocha, mochawesome, selenium and saucelabs to carry out comprehensive testing
+ AI and NLP - Used wit.ai and upgraded to api.ai to create a simple chat bot for the news page
+ Hosted Storage - Uses MongoLab (mLab) and Bansai for hosted mongoDB and ElasticSearch clusters, respectively
+ Travis and BlueMix - Uses build automation tools 

## Architecture

Taken from assignment one (Does not include chat AI):
![][design]
Overview of technologies (Does not include sauceLabs):
![][overview]


## Assignment Specifications
+ Basic Node.js implementation (2 routes) and mongo integration. React Application 
deployed to node with basic read and write -> app has 10+ routes with 
full mongo integration. Application can be ran in dev mode (using npm start)or can be 
ran in a production grade capacity (using npm run build and npm startserver)
+ Good Node.js API design and associated modelling(Mongoose), integrated with 
React application allowing full manipulation of resources. Simple api testing -> 
Full CRUD capabilities for Sprints/Issues/Comments (where relevant). Sprint, Issues and 
Comments modelled using Mongoose, using validators, default values, cascading behaviour (deletes). 
Testing performed using Mocha, reports done with Mochawesome
+ Complex sevice api incorporating nested documents/collections. Seperation of 
concerns. Use of third party NPM modules. Data validation at API -> Domain model 
incorporates nested collections, sprints have many issues, issues have many comments. 
Server.js uses several express routers to map react/axios requests to relevant RESTful 
endpoints. Several Third party NPM modules used, such as Firebase and Zingcharts. Running the 
sauceLabs tests requires selenium packages to be installed on the system. Running the regular 
tests requires mocha and mochawesome. Data validation can be seen throughout the stack. 
Some validation around dates etc is done at the UI level, some basic data validation/parsing is done at the 
controller/routing level and mongoose constraints implement data validation at the model level.
+ Authentication/verification to accomplish richer functionality. Build deployment 
automation using suitable tool. Comprehensive testing strategy for API. -> Authentication 
implemented using firebase. Build deployment automated using build scripts, 
travisCI. All routes tested, cleanup and teardown performed where required. Checking for error and success messages.
+ Integrating 3rd party services/modules, live hosting, testing, reporting, analytics ->
Several 3rd party services integrated including hosted mongo lab, hosted elastic search 
clusters, an ai service for the interactive chat, sauce labs for comprehensive UAT testing, 
all of which provide reporting and analytics. Mochawesome is used to display and analyse 
mocha tests. Mochawesome reports are generated dynamically when mocha tests are ran. npm run mocha

## Mocha and MochAwesome
Running the mocha tests using the nom run mocha should produce results similar to the following:
![][mocha1]
![][mocha2]

## Updated news page
Simulated dashboard now replaced with a static chart that pulls data from an ES cluster.
A dynamic chart that pulls data from mongo data aggregated at the api level, and a simple chatbot 
which can inform a user how many issues are assigned to given users.
![][newNews]

## api.ai
An artificial intelligence service. Uses natural language processing to learn patterns.
Taken from api.ai "Natural Language Understanding Tools to design unique conversation scenarios, design corresponding actions and analyze interactions with users.
The platform learns from examples provided by developers and conversations it has with end users to continuously improve user experience."
The first screenshot shows the desired intents (actions which correspond with recognised patterns)
![][api1]
The next screenshot shows the learning tab where you teach the ai engine to recognise patterns by associating keywords and phrases 
to corresponding intents
![][api2]

## MongoLab - mlab
Taken from the mlab.com siet "mLab is a fully managed cloud 
database service featuring automated provisioning and scaling 
of MongoDB databases, backup and recovery, 24/7 monitoring 
and alerting, web-based management tools, and expert support.
mLab's Database-as-a-Service platform powers hundreds of 
thousands of databases across AWS, Azure, and Google and 
allows developers to focus their attention on product 
development instead of operations." This first screenshot shows 
my two databases - production and testing
![][mLab1]
The next screenshot shows the different domains created in mlab
![][mLab2]
There is also an analytics screen where you can explore various statistics and configurations 
associated with your mlab collections
![][mlabStats]

## Bansai.io and ElasticSearch
Bansai is essentially Elasticsearch on Demand.
"Elasticsearch is a search engine based on Lucene. 
It provides a distributed, multitenant-capable full-text 
search engine with an HTTP web interface and 
schema-free JSON documents. Elasticsearch can be used to 
search all kinds of documents. It provides scalable search, 
has near real-time search, and supports multitenancy. 
Elasticsearch is distributed, which means that indices can 
be divided into shards and each shard can have zero or 
more replicas." For demonstration purpose some sample data has been 
loaded into bansai - this data corresponds to the static chart found on 
the news page
![][bansai1]
The free tier of bansai has some limited analytics also
![][bansaiStats]

## Sauce Labs
Without a doubt, my favourite part of this project was experimenting with sauce labs. 
Using a remote selenium server and a free sauce labs account you can carry out a range of 
automated (using webdriver) UAT tests, against an almost limitless combinations of Operating System / 
Browser Type / Browser Version / Display Configuration. 
For example the following screenshots show the results of me testing my 
Login functionality against Windows 7, Windows 10, OSX, using Firefox, Chrome, Internet Explorer etc. When you 
kick off a test your config is parsed, a vm is created matching your config, 
a clean windows 10 vm with the latest version of chrome takes less than 60 seconds. 
The webdriver tests are then executed against your chosen endpoint. The whole session is 
recorded and can be played back for verification purposes, all commands and timings are logged, 
as well as screenshots. The free tier allows you to kick off 8 tests concurrently so the 
potential volume of tests, even at a free tier, is quite large.
![][sauceLabs]
The analytics are pretty comprehensive
![][sauceLabStats]

## Continuous Integration
The following screenshots show travis being used to build the latest code pushed to github to a bluemix generated vm
![][travis1alt]

![][travis2]

![][travis2alt]

The travis web front end shows the current deployment details 
![][travis1]
Travis can also send you emails when the build completes or fails
![][travisemail]
The build process prints out the bluemix url but you can also see the status of the bluemix 
instance by going to the bluemix web front end
![][bluemix1]

[overview]: ./public/images/overview.png
[design]: ./public/images/design.png
[mocha1]: ./public/images/mocha1.PNG
[mocha2]: ./public/images/mocha2.PNG

[newNews]: ./public/images/newNews.PNG
[api1]: ./public/images/api1.PNG
[api2]: ./public/images/api2.PNG
[mlab1]: ./public/images/mlab1.PNG
[mlab2]: ./public/images/mlab2.PNG
[mlabStats]: ./public/images/mlabStats.PNG
[bansai1]: ./public/images/bansai1.PNG
[bansaiStats]: ./public/images/bansaiStats.PNG
[sauceLabs]: ./public/images/sauceLabs.PNG
[sauceLabStats]: ./public/images/sauceLabStats.PNG

[bluemix1]: ./public/images/bluemix1.PNG
[travis1alt]: ./public/images/travis1alt.PNG
[travis2alt]: ./public/images/travis2alt.PNG
[travis1]: ./public/images/travis1.PNG
[travis2]: ./public/images/travis2.PNG
[travisemail]: ./public/images/travisemail.PNG

