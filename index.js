var cluster = require("cluster");
const path = require("path");

if (cluster.isMaster) {
  const master = require("./master.js");
  master();
} else {
  const worker = require("./worker.js");
  worker();
}
