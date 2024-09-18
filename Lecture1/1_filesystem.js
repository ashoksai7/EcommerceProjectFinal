//fs -> file ststem -> to play with files

const fs = require("fs");
fs.writeFileSync("f1.txt","I have added this sentence from Nodejs");
fs.writeFileSync("f1.txt","I have re written the contenet with this sentence from Nodejs");
console.log("writing response");

fs.appendFileSync("f1.txt","\nI have appended this line from Nodejs");
console.log("Appending sentence");


/*Below line will read the data in buffered format. Buffer is a format in Node JS in which strings are usually stored
for the ease of data manipulation such as string concatenation etc
*/
let data = fs.readFileSync("f1.txt");
fs.writeFileSync("f2.txt",data);
console.log("Data read in buffer format-> ",data);

let data1 = fs.readFileSync("f1.txt","utf-8");
console.log("Data read in UTF-8 format->",data1);

/*to create a folder below is the command. Commented it because it was causing error saying folder already exists
while trying to run the script again and again*/
//fs.mkdirSync("FolderCreatedWithNodeJS");


//asynchoronous method using callback

fs.writeFile("f3.txt","I am written using async method",function(err,data){
    if(err)
        console.log(err);
    else
        console.log("data written through asynchronous method successfully");
})

//But using asynchronous coding using callbacks is not a good idea as this may lead to callback hell. Hence, we should use promises

const filePromise = fs.promises.writeFile("f4.txt","I am written through asynchronous method using promises");

filePromise.then(function(err,data){
    if(err)
        console.log(err);
    else
        console.log("data written through asynchronous method via promises successfully")
})
