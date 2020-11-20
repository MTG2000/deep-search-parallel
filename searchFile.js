var fs = require("fs");
var PdfReader = require("pdfreader").PdfReader;
var filereader = require("./filereader");
const { getFileExtension } = require("./utils");

module.exports = function (file, search, cb) {
  return new Promise((resolve, reject) => {
    const { path: filePath, name: fileName, extension: fileExtension } = file;
    let found = false;
    switch (fileExtension) {
      case ".pdf":
        new PdfReader().parseFileItems(filePath, function (err, item) {
          if (err) return reject(err);
          else if (!item) {
            resolve(found);
          } else if (item.text) {
            if (!found)
              found = ("" + item.text).search(RegExp(search, "i")) !== -1;
            else resolve(true);
          }
        });
        break;
      case ".docx":
      case ".doc":
        filereader.extract(filePath).then(function (data, err) {
          if (err) reject(err);

          if (!found) {
            found = ("" + data).search(RegExp(search, "i")) !== -1;
            resolve(found);
          }
        });
        break;
      case ".txt":
      case ".csv":
        const stream = fs.createReadStream(filePath);
        stream.on("data", (data) => {
          if (!found) {
            found = ("" + data).search(RegExp(search, "i")) !== -1;
          } else {
            stream.close();
          }
        });

        stream.on("close", () => {
          //   console.log(fileName, found);

          resolve(found);
        });

        stream.on("error", (err) => reject(err));
        break;
      default:
        resolve(false);
    }
  });
};
