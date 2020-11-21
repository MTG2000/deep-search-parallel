const server = require("./server.js");
var cluster = require("cluster");

var numWorkers = require("os").cpus().length;

console.log("Master cluster setting up " + numWorkers + " workers...");

for (var i = 0; i < numWorkers; i++) {
  cluster.fork();
}
module.exports = function () {
  server();
};
