var ClusterApp = require('node-cluster-app');

var app = new ClusterApp({
  workers: require('os').cpus().length,
  restart: true,
  evlog:   false
});
app.init(__dirname + '/worker.js')
app.start();
