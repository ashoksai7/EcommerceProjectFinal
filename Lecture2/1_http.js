const http = require("http");
const fs = require("fs");
const server = http.createServer();

const userData = [{name:"Ash",age:24},{name:"Krish",age:24},{name:"Red",age:24}];
server.on("request",function(req,res){e
    console.log("request has been made");
    console.log(req.url);
    console.log(req.method);
    let path = './views'
    if(req.url=="/user"){
        if(req.method == "GET"){
            //Sending data(backend) from a server
            console.log("Send all user details");
            res.end(JSON.stringify(userData));
        }
        else{
            if(req.method == "DELETE"){
                console.log("User is deleting profile");
                res.end("profile deleted");
            }
        }
    }
    else{
        //Send UI from a server
        if(req.url == "/"){
            path += "/index.html";
            fs.readFile(path,function(err,data){
                if(err)
                    console.log(err);
                else{
                    console.log("home page data sent in response");
                    //server is sending this file to client(postman)
                    res.statusCode = 200;
                    res.write(data); //This is one way in which you can write data to a response and then you can end the connection later on.
                    res.end();
                }
            })
        }
        else{
            res.statusCode = 400;
            res.write("Page not found");
            res.end();
        }
    }
})

/* Using if-else blocks for handling requests is not ideal
    as the number of routes increases it would be cumbersome */

server.listen(3000,function(){
    console.log("Started listening on port 3000");
});