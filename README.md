# dclib
Web-based Dreamcorps Library Management System

# Usage guide

$ git clone https://github.com/ShifaSZ/dclib.git

$ cd dclib

$ meteor --port=3600

Install any missing packages according to the Meteor messages

After the Meteor server started, use a browser to open http://localhost:3600



# Build Desktop App for Windows

In a windows system:

Install JDK

Install nodejs

Instal Meteor

In a windows command line (cmd.exe)

> git clone https://github.com/ShifaSZ/dclib.git

> cd dclib

> meteor npm i -g write-file-atomic path-is-inside async-some dezalgo

> meteor add-platform android

> meteor npm install --save-dev meteor-desktop

> meteor --mobile-server=127.0.0.1:3000

In another windows command line window:

> npm run desktop -- init

> npm run desktop

or use below command to build a windows app installer

> npm run desktop -- build-installer
