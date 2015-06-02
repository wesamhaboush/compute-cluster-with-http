const computecluster = require('compute-cluster');
const http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

// allocate a compute cluster
var cc = new computecluster({
  module: './worker.js'
});

//We need a function which handles requests and send response
function handleRequest(request, response){
	cc.enqueue({}, function(err, result) {
		if(err){
		    console.log("an error occured: ", err);
                    response.status = 500;
		    response.end("error occured: " + err);
		} else {
		    response.end(result);
		}
	});
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
