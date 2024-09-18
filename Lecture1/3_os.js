const os = require("os");

console.log("arch",os.arch());
console.log("cpus",os.cpus());
console.log("platform",os.platform());
console.log("free memory",os.freemem());
console.log("ipconfig",os.networkInterfaces());
