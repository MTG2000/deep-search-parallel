const cluster = require("cluster");
const { getFiles } = require("./utils");
var cors = require("cors");
const express = require("express");
const worker = require("./worker");
var app = express();
var http = require("http").createServer(app);

var io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.static("client/dist"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html");
});

const queries = {};

io.on("connection", (socket) => {
  socket.on("newQuery", async (query) => {
    console.log(new Date());
    const { path, search } = query;

    // Get All the files at the specefied directory
    const files = await getFiles(path);

    // Filter Only "Textish" files
    filterdFiles = files.filter((file) =>
      [".txt", ".pdf", ".doc", ".docx"].some((ext) => file.extension === ext)
    );

    // Generate a "hopefully" random id
    const queryId = Math.random().toString().split(".")[1];
    queries[queryId] = { files: filterdFiles, filesBeingProcessed: {}, search };

    //Signal the client that the query begun
    socket.emit("queryBegun", { queryId, files: filterdFiles });

    //Needs changing
    const availableClusters = Object.values(cluster.workers);

    for (
      let i = 0;
      i < Math.min(queries[queryId].files.length, availableClusters.length);
      i++
    ) {
      const file = queries[queryId].files[i];
      queries[queryId].filesBeingProcessed[file.path] = true;
      socket.emit("processingFile", { queryId, file });
      availableClusters[i].send({ queryId, file, search });
    }
  });

  socket.on("stopQuery", async (queryId) => {
    // kill the other workers.
    for (var id in cluster.workers) {
      // console.log("Killed worker");
      // I used process.kill to immediatly terminate the worker (non-graceful termination)
      cluster.workers[id].process.kill();
    }
    socket.emit("finishedQuery", { queryId });
    delete queries[queryId];
  });

  // cluster.on("online", (worker) => {
  //   console.log(`Worker ${worker.process.pid} is Online`);
  // });

  cluster.on("message", (worker, message) => {
    const { queryId, file, result } = message;
    socket.emit("searchResult", { file, queryId, result });
    if (!queries[queryId]) return;

    // Remove File From List
    queries[queryId].files = queries[queryId].files.filter(
      (f) => f.path !== file.path
    );

    // Remove from being processed
    delete queries[queryId].filesBeingProcessed[file.path];

    // Get New File if any remain
    const newFile = queries[queryId].files.find(
      (file) => !queries[queryId].filesBeingProcessed[file.path]
    );

    if (newFile) {
      queries[queryId].filesBeingProcessed[newFile.path] = true;
      socket.emit("processingFile", { queryId, file: newFile });
      worker.send({ queryId, file: newFile, search: queries[queryId].search });
    } else if (Object.keys(queries[queryId].filesBeingProcessed).length === 0) {
      delete queries[queryId];
      console.log(new Date());
      socket.emit("finishedQuery", { queryId });
    }
  });
});

module.exports = function () {
  http.listen(5000, () => {
    console.log("App up and running on http://localhost:5000");
  });
};
