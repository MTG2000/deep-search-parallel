const searchFile = require("./searchFile.js");

module.exports = function () {
  process.on("exit", () => {
    console.log("HAVE TO EXIT");
  });
  process.on("message", async (message) => {
    try {
      const { queryId, file, search } = message;
      console.log(`processing file ${file.name}`);

      const found = await searchFile(file, search);

      process.send({ queryId, file, result: found });
    } catch (error) {
      console.log(error);
      process.send({ queryId, file, result: false });
    }
  });
};
