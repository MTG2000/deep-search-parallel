const server = require("./server.js");
var cluster = require("cluster");

var numWorkers = require("os").cpus().length;

console.log("Master cluster setting up " + numWorkers + " workers...");

for (var i = 0; i < numWorkers; i++) {
  cluster.fork();
}

cluster.on("exit", function (deadWorker, code, signal) {
  // Restart the worker
  var worker = cluster.fork();

  // Note the process IDs
  // var newPID = worker.process.pid;
  // var oldPID = deadWorker.process.pid;

  // Log the event
  // console.log("worker " + oldPID + " died.");
  // console.log("worker " + newPID + " born.");
});
module.exports = function () {
  server();
};
