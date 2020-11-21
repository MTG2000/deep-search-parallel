var cluster = require("cluster");

if (cluster.isMaster) {
  const master = require("./master.js");
  master();
} else {
  const worker = require("./worker.js");
  worker();
}
