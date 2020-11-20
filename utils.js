const { promises: fs } = require("fs");

async function getFiles(path = "./") {
  const entries = await fs.readdir(path, { withFileTypes: true });

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => ({
      ...file,
      path: path + file.name,
      extension: getFileExtension(file.name),
    }));

  // Get folders within the current directory
  const folders = entries.filter((folder) => folder.isDirectory());

  /*
          Add the found files within the subdirectory to the files array by calling the
          current function itself
        */
  for (const folder of folders)
    files.push(...(await getFiles(`${path}${folder.name}/`)));

  return files;
}

function getFileExtension(filename) {
  if (filename.length == 0) return "";
  var dot = filename.lastIndexOf(".");
  if (dot == -1) return "";
  var extension = filename.substr(dot, filename.length);
  return extension;
}

module.exports = { getFileExtension, getFiles };
