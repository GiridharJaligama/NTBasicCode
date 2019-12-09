 var test1={ 
     test : (function() { function test(x,y) {
    visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization:"organization_1"
    }
}, function (v) {


var dashboard = v.dashboard({
resource: "/public/LostAndFound/Dashboards/HVLVReturnableByDate",
runImmediately: false
});

dashboard
.run()
.done(function() { 
this
    .container("#container")
    .render()
    .done(function() { console.log("dashboard rendered"); })
    .fail(function(e) { alert(e); });
})
.fail(function(e) { alert(e); });

        // v("#container").dashboard({
        //          resource: "/public/Samples/Dashboards/1_.Supermart_Dashboard",
        //         //  scale: "container",
        //          error: handleError
        //        });

        //        //show error
        //        function handleError(err) {
        //          alert(err.message);
        //        }
});
 }
     })}