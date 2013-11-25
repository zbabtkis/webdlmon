WebDLMon
========

A web interface for viewing the status of Data Loggers in real-time via web sockets.

Technology
---------
The front end portion of this application is written in Backbone (with Marionette) and loaded asynchronously with require.js.

Currently, it uses a custom Socket.IO adapter to load data logger stats in real time into a Backbone collection.

Usage
-----
Getting this to work with your back end will require some tweaking, but at minimum, you will need to modify the socket.io adapter in src/app.js as well as the APP_URL constant in src/Settings.js

If you would like to compile the javascript source files, you'll need to install requirejs globally on your system with NPM (part of node.js). This is only necessary if you want to optimize performance by getting rid of extra http requests.

Contributing
------------
Go ahead and fork this project so we can make this application more robust and adaptable together!
