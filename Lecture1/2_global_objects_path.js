const { fstat } = require("fs");
const path = require("path");

// it represents features in nodeJS
//console.log(global);

//it represents nodejs process running curretly
//console.log(process);

console.log(__filename);
console.log(__dirname);

const fileExt = path.extname(__filename);
console.log("File extension of current file -> ",fileExt);

const fileName = path.basename(__filename);
console.log("fileName ->",fileName);

const dirName = path.dirname(__filename);
console.log("directory Name ->",dirName);

//I want to create directory from Lecture-1 till Lecture-16

const fs = require("fs");

const projectPath = path.dirname(__dirname);
console.log(projectPath);
for(let i=2;i<=16;i++){
    let pathName = path.join(projectPath,`Lecture${i}`);
    fs.mkdirSync(pathName);
}