var PdfReader = require("pdfreader").PdfReader;
var fs = require("fs");

const stream = fs.createReadStream("./files/مترجمات - الجلسة 5.pdf");

stream.on("data", (buffer) => {
  new PdfReader().parseBuffer(buffer, function (err, item) {
    if (err) callback(err);
    else if (!item) callback();
    else if (item.text) console.log(item.text);
  });
});
