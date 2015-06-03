//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT = 8080; 
const AGENT = new http.Agent({
	keepAlive: true, 
	keepAliveMsecs: 500,
        maxSockets: Infinity,
	maxFreeSockets: 256 
});
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
const OPTIONS = {
  host: 'localhost',
  port: 9001,
  path: '/random',
  agent: AGENT
};

//We need a function which handles requests and send response
function handleRequest(request, response){
	http.request(OPTIONS, function handleResponse(response2){
                var result = '';
		//another chunk of data has been recieved, so append it to `str`
                response2.on('data', function handleChunk(chunk){
			result += chunk;
                });
		//the whole response has been recieved, so we just print it out here
		response2.on('end', function () {
			response.end(result);
		});
	}).end();
}

//Create a server
var server = http.createServer(handleRequest);
var connectionCount = 0;
var closedSockets = 0;
//Lets start our server
server
.on('connection', function announceConnectionAndSetTimeout(socket) {
	console.log("A new connection was made by a client [%d]", ++connectionCount );
	socket.setTimeout(30 * 1000);
        // 30 second timeout. Change this as you see fit.
        socket.on('close', function handleSocketClosing(){
		console.log("A socket has been closed, so far [%d]", ++closedSockets);
	});
})
.listen(PORT, function announceServerStarted(){
	console.log("server started listening on port [%s]", PORT);
});
