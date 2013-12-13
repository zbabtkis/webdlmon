WebDLMon
========

A web interface for viewing the status of Data Loggers in real-time via web sockets.

Technology
---------
The front end portion of this application is written in Backbone (with Marionette) and loaded asynchronously with require.js.

Use
-----
To hook your data up to the webdlmon front end, you can use the application event emitter (vent) provided in data.js. Every action that comes in data.js by default is for example only. You should replace the data fetching logic (code within the returned function) with your own. 

Adding data to the data logger collection can be accomplished by triggering a "data" event on the app vent along with a single or set of data logger JSON objects. For example, loading data via AJAX would look something like this:

```javascript
$.when($.getJSON('myData.json'))
  /**
   * @param data [
   *    {
   *      id: "SB_WLA",
   *      dt: 36.46955,
   *      dv: 12.323505,
   *      da: 0.06877045
   *    },
   *    {
   *      id: "SB_WLA",
   *      dt: 37.98347,
   *      dv: 11.346475,
   *      da: 0.43997547
   *    }
   *  ]
   * 
   *  OR
   *    {
   *      id: "SB_WLA",
   *      dt: 37.98347,
   *      dv: 11.346475,
   *      da: 0.43997547
   *    }
   *  
   */
  .then(function(data) {
    vent.trigger('data', data);
  });
```

If you would like to compile the javascript source files, you'll need to install requirejs globally on your system with NPM (part of node.js). This is only necessary if you want to optimize performance by getting rid of extra http requests.

Example
-------
To see this app in action, visit http://webdlmon.nees.ucsb.edu:8888.

Contributing
------------
Go ahead and fork this project so we can make this application more robust and adaptable together!
