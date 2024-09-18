const payLoadSanity=(req,res,next)=>{
    try{
        let user = req.body;
        let isEmpty = Object.keys(user).length==0;
        if(isEmpty){
            res.status(400).json({
                status: "fail",
                message:"Please do not provide empty resource details"})
        }
        else
            next();
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports={
    payLoadSanity
}