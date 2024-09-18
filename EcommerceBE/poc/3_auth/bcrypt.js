const bcrypt = require("bcrypt");
const password = "12345678";


async function hashPassword(password){
    console.time();
    // work factor -> advised range10 to 12 -> 
    // increases number of iterations for
    // salting thus increasing the time for hashing
    // it can be passed as argument to genSalt method
    const randomSalt = await bcrypt.genSalt(12);
    console.log("randomSalt",randomSalt);
    const hashedPassword = await bcrypt.hash(password,randomSalt);
    console.log("hashedPassword",hashedPassword);

    //comparing passowrd entered by user with hash present in DB
    const isSame = await bcrypt.compare(password,hashedPassword);
    /**
     * In above step though we did not pass
     * random salt to compare function we
     * are able to compare. This is because
     * random salt is the part(sub string)
     * of hashedPassword itself.
     */
    console.log("result",isSame);
    console.timeEnd();
}

hashPassword(password).then(()=>{
    console.log("password hashing done");
}).catch(err=>console.log(err));