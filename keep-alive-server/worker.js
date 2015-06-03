var http    =  require('http');
var mockserver  =  require('mockserver');
const PORT = 9001;
const PATH_TO_MOCKS_ROOT = './mocks';

var connectionCount = 0;
var closedSockets = 0;

http
	.createServer(mockserver(PATH_TO_MOCKS_ROOT))
	.on('connection', function announceConnectionAndSetTimeout(socket) {
		console.log("A new connection was made by a client [%d].", ++connectionCount);
		socket.setTimeout(30 * 1000); 
		  // 30 second timeout. Change this as you see fit.
		socket.on('close', function handleSocketClosing(){
			console.log("A socket has been closed, so far [%d]", ++closedSockets);
		});
	})
        .listen(PORT, function announceServerStarted(){
		console.log("server started listening on port [%s]", PORT);
	});

