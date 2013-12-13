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
   *      id: "MY_LOG_1",
   *      dt: 36.46955,
   *      dv: 12.323505,
   *      da: 0.06877045
   *    },
   *    {
   *      id: "MY_LOG_2",
   *      dt: 37.98347,
   *      dv: 11.346475,
   *      da: 0.43997547
   *    }
   *  ]
   * 
   *  OR
   *  {
   *    id: "MY_LOG_1",
   *    dt: 37.98347,
   *    dv: 11.346475,
   *    da: 0.43997547
   *  }
   *  
   */
  .then(function(data) {
    vent.trigger('data', data);
  });
```

Providing data for graphing date logger history is also done using the app vent.

There are two graphing views in the webdlmon application -- a single field graph and a multi field graph. There are five fields that can be graphed (using the default template): amplitude (da), voltage (dv), temperature (dt), latency (dl), and clock quality (lcq).

Use the "FieldDataFetchBehavior" event to implement your field fetching behavior. That event sends three arguments: id, field, and a callback to add data to the graph.

```javascript
vent.on('FieldDataFetchBehavior', function(id, field, addData) {
  $.when($.getJSON('/rrd/' + id + '/' + field))
    /**
     * @param data
     * [
     *  [value1, timestamp1],
     *  [value2, timestamp2],
     *  [value3, timestamp3]
     * ]
     */
    .then(function(data) {
      addData({
        name: field, 
        data: data
      });
    });
```

To provide a data fetcher for the multi-graph view, do the smae as above, but instead, respond to the 'InfoDataFetchBehavior' event.

If you would like to compile the javascript source files, you'll need to install requirejs globally on your system with NPM (part of node.js). This is only necessary if you want to optimize performance by getting rid of extra http requests.

Example
-------
To see this app in action, visit http://webdlmon.nees.ucsb.edu:8888.

Contributing
------------
Go ahead and fork this project so we can make this application more robust and adaptable together!
