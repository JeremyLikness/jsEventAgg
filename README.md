jsEventAgg
==========

Lightweight event aggregator (publisher/subscriber) for JavaScript

**Create Instance**

    var events = new WintellectJs.$$jsEventAgg();
     
**Subscribe** 

    var subscription = events.subscribe("myEvent", function(msg) { alert(msg.payload); });
    
**Publish**

    events.publish("myEvent", { payload: "Hello, world." });
    
**Unsubscribe** 

    events.unSubscribe("myEvent", subscription); 
