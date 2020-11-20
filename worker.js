const searchFile = require("./searchFile.js");

module.exports = function () {
  process.on("message", async (message) => {
    try {
      const { queryId, file, search } = message;
      const found = await searchFile(file, search);

      process.send({ queryId, file, result: found });
    } catch (error) {
      console.log(error);
      process.send({ queryId, file, result: false });
    }
  });
};
